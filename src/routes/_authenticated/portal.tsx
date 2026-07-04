import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => ({
    meta: [
      { title: "Patient Portal — BioBlend" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PortalPage,
});

type Profile = {
  full_name: string | null;
  phone: string | null;
  preferred_language: string;
};

function PortalPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      setEmail(userData.user.email ?? "");
      const { data } = await supabase
        .from("profiles")
        .select("full_name, phone, preferred_language")
        .eq("id", userData.user.id)
        .maybeSingle();
      setProfile(data ?? { full_name: "", phone: "", preferred_language: "en" });
      setLoading(false);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-16">
      <div className="mx-auto w-full max-w-3xl px-4">
        <div className="text-center">
          <p className="eyebrow">Patient Portal</p>
          <h1 className="mt-3 font-serif text-4xl text-primary">
            {loading ? "Loading…" : `Welcome, ${profile?.full_name || email}`}
          </h1>
          <div className="mx-auto mt-4 gold-rule" />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <PlaceholderCard
            title="My prescriptions"
            body="Your active compounded formulations will appear here."
          />
          <PlaceholderCard
            title="Refill requests"
            body="Request refills and track their status in real time."
          />
          <PlaceholderCard
            title="Consultations"
            body="Book a pharmacist consultation or review past notes."
          />
          <PlaceholderCard
            title="Documents"
            body="Prescriptions, invoices, and lab notes — all in one place."
          />
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" onClick={signOut} className="rounded-full">
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}

function PlaceholderCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-6 shadow-luxe backdrop-blur-sm">
      <p className="font-serif text-xl text-primary">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground/70">
        Coming soon
      </p>
    </div>
  );
}
