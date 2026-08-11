import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  inquiry_type: z.enum(["personal", "corporate", "clinician"]),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().nullable(),
  organization: z.string().trim().max(150).optional().nullable(),
  subject: z.string().trim().max(200).optional().nullable(),
  message: z.string().trim().min(1).max(2000),
});

export const submitContactInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      inquiry_type: data.inquiry_type,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      organization: data.organization || null,
      subject: data.subject || null,
      message: data.message,
    });
    if (error) {
      console.error("[contact] insert failed", error.message);
      throw new Error("Failed to save inquiry");
    }
    return { ok: true as const };
  });
