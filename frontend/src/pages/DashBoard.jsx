import useAppStore from "../store/useAppStore";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import AddRepoModal from "../components/AddRepoModal";

const useUser = () => {
  return {
    name: "Abhigyan Jha",
    username: "Abhigyan2005",
    avatar: "https://github.com/Abhigyan2005.png",
  };
};

export default function Dashboard() {
  const user = useUser();
  const activeRepo = useAppStore((s) => s.activeRepo);
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);

  return (
    <div className="flex flex-col h-screen bg-[#0b1326] text-[#e8e6f5]">
      <div className="flex items-center justify-between px-5 h-14 bg-[#171f33] shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[#c7c4d8] hover:text-white transition-colors text-lg leading-none"
          >
            ☰
          </button>
          <span className="font-extrabold text-lg bg-linear-to-r from-[#c0c1ff] to-[#4b4dd8] bg-clip-text text-transparent">
            RepoInsight
          </span>
        </div>

        {activeRepo && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_6px_#4edea3] animate-pulse" />
            <span className="text-xs text-[#c7c4d8] font-mono">
              {activeRepo.name}
            </span>
            {activeRepo.chunks > 0 && (
              <span className="text-[11px] text-[#c7c4d8] bg-[#2d3449] px-2 py-0.5 rounded font-mono">
                {activeRepo.chunks} chunks
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar user={user} />}
        <ChatArea user={user} />
      </div>
      <AddRepoModal />
    </div>
  );
}
