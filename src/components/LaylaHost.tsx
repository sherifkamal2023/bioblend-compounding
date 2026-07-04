import { useEffect, useState } from "react";

/**
 * Layla — BioBlend AI Host
 *
 * Embeds ElevenLabs Conversational AI widget. Layla is configured
 * inside the ElevenLabs dashboard (voice, persona, knowledge base).
 * Set VITE_ELEVENLABS_AGENT_ID to your Layla agent ID.
 *
 * The agent's system prompt should include:
 *  - Persona: "You are Layla, a warm bilingual (English/Arabic) pharmacist
 *    at BioBlend Compounding Pharmacy in Dubai."
 *  - Scope: guide visitors through services (hormone, dermatology,
 *    pediatric, pet wellness, IV wellness), booking, and general info.
 *  - Boundary: never give medical diagnosis; refer to a pharmacist.
 */

// Register the ElevenLabs custom element type for JSX (React 19)
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "agent-id"?: string },
        HTMLElement
      >;
    }
  }
}

const AGENT_ID = import.meta.env.VITE_ELEVENLABS_AGENT_ID as string | undefined;

export function LaylaHost() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Inject ElevenLabs widget script once
    const scriptSrc = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    if (document.querySelector(`script[src="${scriptSrc}"]`)) return;
    const s = document.createElement("script");
    s.src = scriptSrc;
    s.async = true;
    s.type = "text/javascript";
    document.body.appendChild(s);
  }, []);

  if (!mounted || !AGENT_ID) return null;

  return (
    <div className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6">
      <elevenlabs-convai agent-id={AGENT_ID} />
    </div>
  );
}
