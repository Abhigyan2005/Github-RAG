import { useRef, useEffect } from "react";
import useAppStore from "../store/useAppStore";
import Avatar from "./Avatar";
import ReactMarkdown from "react-markdown";

const SUGGESTIONS = [
  "What does this repo do?",
  "Explain the main architecture",
  "How does auth work?",
];

export default function MessageList({ user, onSuggestionClick }) {
  const bottomRef = useRef(null);
  const setModalOpen = useAppStore((s) => s.setModalOpen);
  const activeRepo = useAppStore((s) => s.activeRepo);
  const messages = useAppStore((s) => s.messages);
  const loading = useAppStore((s) => s.loading);
  const currentMessages = activeRepo ? messages[activeRepo.id] || [] : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeRepo]);

  if (!activeRepo) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
        <span className="text-5xl opacity-10">⬡</span>
        <p className="text-xl font-extrabold text-[#e8e6f5]/20">
          Select or add a repository
        </p>
        <p className="text-sm text-[#464555] text-center max-w-xs">
          Index any public GitHub repo and start asking questions about the
          codebase.
        </p>
        {!activeRepo && (
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 bg-linear-to-br from-[#c0c1ff] to-[#4b4dd8] text-[#0b1326] rounded-lg text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            + Add Repository
          </button>
        )}
      </div>
    );
  }

  if (currentMessages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
        <span className="text-5xl opacity-10">⬡</span>
        <p className="text-2xl font-extrabold text-[#e8e6f5]/20">
          Ask anything about
        </p>
        <p className="text-2xl font-extrabold bg-linear-to-r from-[#c0c1ff] to-[#4b4dd8] bg-clip-text text-transparent opacity-60">
          {activeRepo.name}
        </p>
        <div className="flex gap-2 mt-4 flex-wrap justify-center max-w-lg">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onSuggestionClick(s)}
              className="bg-[#171f33] border border-[#464555]/20 rounded-lg px-3 py-2 text-[#c7c4d8] text-xs hover:border-[#c0c1ff]/30 transition-colors cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 flex flex-col gap-6 py-2">
      {currentMessages.map((msg, i) => (
        <div
          key={i}
          className={`flex gap-3 items-start ${msg.role === "user" ? "flex-row-reverse" : ""}`}
        >
          {msg.role === "user" ? (
            user ? (
              <Avatar user={user} size={8} />
            ) : (
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#c0c1ff] to-[#4b4dd8] flex items-center justify-center text-[#0b1326] text-xs font-bold shrink-0">
                U
              </div>
            )
          ) : (
            <div className="w-8 h-8 shrink-0 rounded-full bg-[#2d3449] flex items-center justify-center text-sm text-[#c0c1ff]">
              ⬡
            </div>
          )}
          <div
            className={`px-4 py-3 text-sm leading-relaxed max-w-[80%] ${
              msg.role === "user"
                ? "bg-[#4b4dd8]/20 border border-[#4b4dd8]/30 rounded-[16px_4px_16px_16px]"
                : "bg-[#171f33] border border-[#464555]/20 rounded-[4px_16px_16px_16px]"
            }`}
          >
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 shrink-0 rounded-full bg-[#2d3449] flex items-center justify-center text-sm text-[#c0c1ff]">
            ⬡
          </div>
          <div className="bg-[#171f33] border border-[#464555]/20 rounded-[4px_16px_16px_16px] px-4 py-4 flex gap-1.5 items-center">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff] animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
