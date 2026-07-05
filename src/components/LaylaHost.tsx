import { useCallback, useEffect, useRef, useState } from "react";
import { useConversation } from "@elevenlabs/react";
import { Phone, MessageCircle, X, Send, PhoneOff } from "lucide-react";
import laylaAvatar from "@/assets/layla-avatar.jpg.asset.json";
import { getLaylaConversationToken } from "@/lib/elevenlabs.functions";

/**
 * Layla — BioBlend AI Host
 *
 * Custom launcher: large circular Layla portrait with a phone button
 * (voice call) on one side and a chat button (text) on the other.
 * No card / white background — icons float around the avatar.
 */

type ChatMsg = { role: "user" | "assistant"; text: string };

export function LaylaHost() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <LaylaHostClient />;
}

function LaylaHostClient() {
  const [mode, setMode] = useState<"idle" | "voice" | "chat">("idle");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [connecting, setConnecting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = useConversation({
    onMessage: (m: { message?: string; source?: string }) => {
      if (!m?.message) return;
      setMessages((prev) => [
        ...prev,
        { role: m.source === "user" ? "user" : "assistant", text: m.message! },
      ]);
    },
    onError: (err) => {
      console.error("Layla error:", err);
      setConnecting(false);
      setMode("idle");
    },
    onDisconnect: () => {
      setMode((m) => (m === "voice" ? "idle" : m));
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const startSession = useCallback(
    async (opts: { textOnly: boolean }) => {
      setConnecting(true);
      try {
        if (!opts.textOnly) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
        }
        const { token } = await getLaylaConversationToken();
        await conversation.startSession({
          conversationToken: token,
          connectionType: "webrtc",
          ...(opts.textOnly ? { textOnly: true } : {}),
        } as Parameters<typeof conversation.startSession>[0]);
      } catch (e) {
        console.error("Failed to start Layla:", e);
        setMode("idle");
      } finally {
        setConnecting(false);
      }
    },
    [conversation],
  );

  const handlePhoneClick = useCallback(async () => {
    if (mode === "voice") {
      await conversation.endSession();
      setMode("idle");
      return;
    }
    setMode("voice");
    await startSession({ textOnly: false });
  }, [mode, conversation, startSession]);

  const handleChatClick = useCallback(async () => {
    setChatOpen((v) => !v);
    if (mode === "idle") {
      setMode("chat");
      await startSession({ textOnly: true });
    }
  }, [mode, startSession]);

  const sendChat = useCallback(() => {
    const text = input.trim();
    if (!text || conversation.status !== "connected") return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    conversation.sendUserMessage(text);
    setInput("");
  }, [input, conversation]);

  const isSpeaking = conversation.isSpeaking;
  const isConnected = conversation.status === "connected";

  return (
    <div className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6">
      {/* Chat panel */}
      {chatOpen && (
        <div className="mb-3 w-[300px] max-h-[380px] rounded-2xl border border-primary/20 bg-background/95 backdrop-blur-md shadow-xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border/60">
            <span className="text-xs font-medium text-primary">Chat with Layla</span>
            <button
              onClick={() => setChatOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.length === 0 && (
              <p className="text-xs text-muted-foreground italic">
                {connecting ? "Connecting…" : "Say hello to Layla ✨"}
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-border/60 p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChat()}
              placeholder={isConnected ? "Type a message…" : "Connecting…"}
              disabled={!isConnected}
              className="flex-1 rounded-full bg-secondary px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              onClick={sendChat}
              disabled={!isConnected || !input.trim()}
              className="rounded-full bg-primary p-2 text-primary-foreground disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Launcher row: phone — avatar — chat */}
      <div className="flex items-center gap-3">
        {/* Phone button (left) */}
        <button
          onClick={handlePhoneClick}
          aria-label={mode === "voice" ? "End call with Layla" : "Call Layla"}
          className={`grid place-items-center h-12 w-12 rounded-full shadow-lg transition-all ${
            mode === "voice"
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-primary text-primary-foreground hover:scale-105"
          }`}
        >
          {mode === "voice" ? <PhoneOff className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
        </button>

        {/* Layla avatar (center, prominent) */}
        <div className="relative">
          {(isSpeaking || connecting) && (
            <span className="absolute inset-0 rounded-full animate-ping bg-primary/40" />
          )}
          <div
            className={`relative h-20 w-20 rounded-full overflow-hidden ring-4 shadow-2xl transition-all ${
              isConnected ? "ring-primary" : "ring-primary/40"
            }`}
          >
            <img
              src={laylaAvatar.url}
              alt="Layla — BioBlend AI pharmacist"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Chat button (right) */}
        <button
          onClick={handleChatClick}
          aria-label="Chat with Layla"
          className={`grid place-items-center h-12 w-12 rounded-full shadow-lg transition-all ${
            chatOpen
              ? "bg-primary text-primary-foreground"
              : "bg-primary/90 text-primary-foreground hover:scale-105"
          }`}
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
