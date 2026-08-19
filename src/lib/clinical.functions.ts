import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const CLINICAL_ROLES = ["pharmacist", "admin", "staff"] as const;

const AskInput = z.object({
  mode: z.enum([
    "mentoring",
    "order_review",
    "treatment_plan",
    "care_plan",
    "follow_up",
    "formulation",
  ]),
  patientContext: z.string().max(8000).optional(),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(20000) }))
    .max(30)
    .default([]),
  question: z.string().min(3).max(8000),
});

/** Does the signed-in user have access to the clinical workspace? */
export const getClinicalAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    const roles = (data ?? []).map((r) => r.role as string);
    return {
      allowed: roles.some((r) => (CLINICAL_ROLES as readonly string[]).includes(r)),
      roles,
    };
  });

/** Ask the Clinical Pharmacist AI. Role-gated, server-side prompt. */
export const askClinicalAi = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => AskInput.parse(input))
  .handler(async ({ data, context }) => {
    const { data: roleRows } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    const allowed = (roleRows ?? []).some((r) =>
      (CLINICAL_ROLES as readonly string[]).includes(r.role as string),
    );
    if (!allowed) throw new Error("Clinical workspace access is restricted to BioBlend pharmacists.");

    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured for this project.");

    const [{ createLovableAiGatewayProvider }, { buildSystemPrompt }, { streamText }] =
      await Promise.all([
        import("@/lib/ai-gateway.server"),
        import("@/lib/clinical/prompt.server"),
        import("ai"),
      ]);

    const gateway = createLovableAiGatewayProvider(key);

    try {
      const result = streamText({
        model: gateway("google/gemini-3.7-flash"),
        system: buildSystemPrompt(data.mode, data.patientContext),
        messages: [
          ...data.history.map((m) => ({ role: m.role, content: m.content }) as const),
          { role: "user" as const, content: data.question },
        ],
      });
      return { answer: await result.text };
    } catch (err) {
      const status = (err as { statusCode?: number; status?: number })?.statusCode ??
        (err as { status?: number })?.status;
      if (status === 402)
        throw new Error("AI credits are exhausted for this workspace. Please top up in Lovable to continue.");
      if (status === 429)
        throw new Error("The AI service is rate limited right now — please retry in a moment.");
      throw new Error(
        `Clinical AI request failed: ${(err as Error)?.message ?? "unknown error"}`,
      );
    }
  });
