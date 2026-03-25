import { useState } from "react";
import useAppStore from "../store/useAppStore";
import MessageList from "./MessageList";

export default function ChatArea({ user }) {
  const activeRepo = useAppStore((s) => s.activeRepo);
  const addMessage = useAppStore((s) => s.addMessage);
  const setLoading = useAppStore((s) => s.setLoading);
  const loading = useAppStore((s) => s.loading);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleAsk = async () => {
    if (!input.trim() || !activeRepo || loading) return;
    const question = input;
    setInput("");

    addMessage(activeRepo.id, { role: "user", text: question });
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      console.log(data.answer);

      addMessage(activeRepo.id, { role: "ai", text: data.answer });
    } catch (e) {
      addMessage(activeRepo.id, { role: "ai", text: "Something went wrong." });
      console.log(e);
    }

    setLoading(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {activeRepo ? (
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#464555]/20 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[#464555] text-sm shrink-0">⬡</span>
            <span className="text-sm font-semibold text-[#e8e6f5] truncate">
              {activeRepo.name}
            </span>
            <span className="text-[11px] text-[#464555] font-mono truncate hidden sm:block">
              / {activeRepo.url}
            </span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#464555]/40 text-[#c7c4d8] hover:bg-[#1e2740] hover:border-[#c0c1ff]/30 transition-all text-xs font-semibold cursor-pointer shrink-0 ml-3"
          >
            {copied ? (
              <>
                <span className="text-[#4edea3]">✓</span>
                <span className="text-[#4edea3]">Copied!</span>
              </>
            ) : (
              <>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share
              </>
            )}
          </button>
        </div>
      ) : null}

      <div className="flex-1 overflow-y-auto py-8">
        <MessageList user={user} onSuggestionClick={(s) => setInput(s)} />
      </div>

      {activeRepo && (
        <div className="px-6 pb-5 pt-3">
          <div className="max-w-2xl mx-auto bg-[#2d3449] rounded-xl flex items-end gap-3 px-4 py-3 border border-[#464555]/30 focus-within:border-[#c0c1ff]/30 transition-colors">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAsk();
                }
              }}
              placeholder={`Ask anything about ${activeRepo.name}...`}
              rows={1}
              className="flex-1 bg-transparent border-none text-[#e8e6f5] text-sm placeholder-[#464555] resize-none leading-relaxed max-h-28 overflow-y-auto focus:outline-none"
            />
            <button
              onClick={handleAsk}
              disabled={!input.trim() || loading}
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-base font-bold shrink-0 transition-all ${
                input.trim() && !loading
                  ? "bg-linear-to-br from-[#c0c1ff] to-[#4b4dd8] text-[#0b1326] hover:opacity-90 hover:scale-95 cursor-pointer"
                  : "bg-[#464555] text-[#464555] cursor-not-allowed"
              }`}
            >
              ↑
            </button>
          </div>
          <p className="max-w-2xl mx-auto mt-1.5 text-center text-[11px] text-[#464555] font-mono">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      )}
    </div>
  );
}
