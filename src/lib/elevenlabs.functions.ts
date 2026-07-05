import { createServerFn } from "@tanstack/react-start";

const AGENT_ID = "agent_0701kws4g2d5edgtrv6h6rw218gp";

/**
 * Mint a short-lived WebRTC conversation token for Layla.
 * Keeps the ElevenLabs API key server-side.
 */
export const getLaylaConversationToken = createServerFn({ method: "POST" }).handler(
  async () => {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) throw new Error("ElevenLabs is not connected to this project");

    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${AGENT_ID}`,
      { headers: { "xi-api-key": apiKey } },
    );
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Token request failed (${res.status}): ${body}`);
    }
    const { token } = (await res.json()) as { token: string };
    return { token };
  },
);
