import { useEffect, useState } from "react";
import laylaAvatar from "@/assets/layla-avatar.jpg.asset.json";

/**
 * Layla — BioBlend AI Host
 *
 * Embeds ElevenLabs Conversational AI widget with a custom human
 * avatar image (replaces the default orb). The widget will animate
 * the avatar (pulse / speaking ring) in sync with agent audio.
 *
 * NOTE: True mouth-level lip-sync from a still photo requires a
 * video-avatar provider (Simli / Beyond Presence / HeyGen) enabled
 * on the ElevenLabs agent in the dashboard. Once enabled there, the
 * widget picks it up automatically — no code change needed.
 */

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "agent-id"?: string;
          "avatar-image-url"?: string;
          "avatar-orb-color-1"?: string;
          "avatar-orb-color-2"?: string;
        },
        HTMLElement
      >;
    }
  }
}

const AGENT_ID =
  (import.meta.env.VITE_ELEVENLABS_AGENT_ID as string | undefined) ??
  "agent_0701kws4g2d5edgtrv6h6rw218gp";

export function LaylaHost() {
  const [mounted, setMounted] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    // Widget requires an absolute URL for the avatar image
    setAvatarUrl(
      laylaAvatar.url.startsWith("http")
        ? laylaAvatar.url
        : `${window.location.origin}${laylaAvatar.url}`,
    );

    const scriptSrc = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    if (document.querySelector(`script[src="${scriptSrc}"]`)) return;
    const s = document.createElement("script");
    s.src = scriptSrc;
    s.async = true;
    s.type = "text/javascript";
    document.body.appendChild(s);
  }, []);

  if (!mounted || !AGENT_ID || !avatarUrl) return null;

  return (
    <div className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6">
      <elevenlabs-convai
        agent-id={AGENT_ID}
        avatar-image-url={avatarUrl}
      />
    </div>
  );
}
