import { useState } from "react";
import useAppStore from "../store/useAppStore";
import axios from "axios";

export default function AddRepoModal() {
  const modalOpen = useAppStore((s) => s.modalOpen);
  const setModalOpen = useAppStore((s) => s.setModalOpen);
  const addRepo = useAppStore((s) => s.addRepo);
  const setActiveRepo = useAppStore((s) => s.setActiveRepo);
  const [repoUrl, setRepoUrl] = useState("");
  const [indexing, setIndexing] = useState(false);
  const [indexDone, setIndexDone] = useState(false);

  const handleAddRepo = async () => {
    if (!repoUrl.trim()) return;
    setIndexing(true);
    setIndexDone(false);

    try {
      const res = await axios.post("http://localhost:8000/index", {
        github_url: repoUrl, 
      });
      const chunks = res.data.chunks_count;
      const name = repoUrl.split("/").pop() || "New Repo";
      const newRepo = { id: Date.now(), name, url: repoUrl, chunks };

      addRepo(newRepo);
      setIndexing(false);
      setIndexDone(true);

      setTimeout(() => {
        setModalOpen(false);
        setIndexDone(false);
        setRepoUrl("");
        setActiveRepo(newRepo);
      }, 1200);
    } catch (err) {
      console.error("Indexing failed:", err);
      setIndexing(false);
    }
  };
  const handleClose = () => {
    if (!indexing) {
      setModalOpen(false);
      setRepoUrl("");
    }
  };

  if (!modalOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-[#060e20]/10 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#2d3449] rounded-2xl p-8 w-full max-w-md border border-[#464555]/40 mx-4"
      >
        <h2 className="font-extrabold text-xl mb-1">Index a Repository</h2>
        <p className="text-[#c7c4d8] text-sm mb-6">
          Paste a public GitHub URL to fetch, chunk, and embed the codebase.
        </p>

        <input
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddRepo()}
          placeholder="https://github.com/owner/repo"
          disabled={indexing}
          className="w-full bg-[#060e20] border border-[#464555]/40 rounded-lg px-4 py-3 text-[#e8e6f5] text-sm font-mono placeholder-[#464555] focus:outline-none focus:border-[#c0c1ff]/40 mb-4 disabled:opacity-50 transition-colors"
        />

        {indexing && (
          <div className="flex items-center gap-2 mb-4 text-[#c7c4d8] text-sm">
            <span className="w-2 h-2 rounded-full bg-[#c0c1ff] animate-pulse" />
            Fetching files, chunking, embedding vectors...
          </div>
        )}

        {indexDone && (
          <div className="flex items-center gap-2 mb-4 text-[#4edea3] text-sm">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_6px_#4edea3]" />
            Repository indexed successfully!
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button
            onClick={handleClose}
            disabled={indexing}
            className="px-5 py-2.5 bg-transparent border border-[#464555]/40 rounded-lg text-[#c7c4d8] text-sm hover:bg-[#1e2740] transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleAddRepo}
            disabled={!repoUrl.trim() || indexing}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              repoUrl.trim() && !indexing
                ? "bg-linear-to-br from-[#c0c1ff] to-[#4b4dd8] text-[#0b1326] hover:opacity-90 cursor-pointer"
                : "bg-[#464555] text-[#464555] cursor-not-allowed"
            }`}
          >
            {indexing ? "Indexing..." : "Index Repository"}
          </button>
        </div>
      </div>
    </div>
  );
}
