import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Patient Portal Sign In — BioBlend Compounding Pharmacy" },
      {
        name: "description",
        content:
          "Sign in to your BioBlend patient portal to manage prescriptions, refills, and personalized formulations.",
      },
    ],
  }),
  component: AuthPage,
});

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

const signUpSchema = signInSchema.extend({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  phone: z.string().trim().min(6, "Enter a valid phone").max(30),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/portal", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      if (mode === "signin") {
        const parsed = signInSchema.safeParse({
          email: fd.get("email"),
          password: fd.get("password"),
        });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }
        const { error } = await supabase.auth.signInWithPassword(parsed.data);
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Welcome back");
        navigate({ to: "/portal", replace: true });
      } else {
        const parsed = signUpSchema.safeParse({
          email: fd.get("email"),
          password: fd.get("password"),
          fullName: fd.get("fullName"),
          phone: fd.get("phone"),
        });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/portal`,
            data: {
              full_name: parsed.data.fullName,
              phone: parsed.data.phone,
              preferred_language: "en",
            },
          },
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Check your inbox to confirm your email.");
        setMode("signin");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto w-full max-w-md px-4">
        <div className="text-center">
          <p className="eyebrow">Patient Portal</p>
          <h1 className="mt-3 font-serif text-4xl text-primary">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <div className="mx-auto mt-4 gold-rule" />
          <p className="mt-6 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Access your prescriptions, refills, and personalized formulations."
              : "For current BioBlend patients. Your account will be verified against our records."}
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-10 space-y-5 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-luxe backdrop-blur-sm"
        >
          {mode === "signup" && (
            <>
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" name="fullName" required autoComplete="name" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" required autoComplete="tel" className="mt-1.5" />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              minLength={6}
              className="mt-1.5"
            />
          </div>
          <Button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-[color:var(--brand-gold)] text-primary hover:bg-[color:var(--brand-gold)]/90"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {mode === "signin" ? "New patient? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              {mode === "signin" ? "Create account" : "Sign in"}
            </button>
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
