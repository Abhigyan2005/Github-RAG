import useAppStore from "../store/useAppStore";
import Avatar from "./Avatar";

export default function Sidebar({ user }) {
  const {
    repos,
    activeRepo,
    setActiveRepo,
    setModalOpen,
    sidebarOpen,
    setSidebarOpen,
  } = useAppStore();

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full z-50 w-60 bg-[#060e20] flex flex-col p-3 overflow-hidden transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="self-end mb-2 text-[#464555] hover:text-[#c7c4d8] transition-colors text-lg leading-none cursor-pointer"
        >
          ✕
        </button>

        <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2.5 border border-[#464555]/40 rounded-lg text-[#c7c4d8] hover:bg-[#1e2740] transition-colors text-sm font-semibold mb-2 cursor-pointer w-full"
          >
            <span className="text-base leading-none">+</span>
            New Repository
          </button>

          {repos.length > 0 && (
            <p className="text-[11px] text-[#464555] font-bold tracking-widest uppercase px-3 mb-1">
              Repositories
            </p>
          )}

          {repos.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 gap-2 px-3 text-center">
              <span className="text-3xl opacity-10">⬡</span>
              <p className="text-xs text-[#464555]">
                No repositories yet.
                <br />
                Add one to get started.
              </p>
            </div>
          )}

          {repos.map((repo) => (
            <button
              key={repo.id}
              onClick={() => {
                setActiveRepo(repo);
                setSidebarOpen(false);
              }}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors w-full cursor-pointer ${
                activeRepo?.id === repo.id
                  ? "bg-[#1e2740]"
                  : "hover:bg-[#1e2740]/60"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[#464555] text-sm shrink-0">⬡</span>
                <div className="min-w-0 text-left">
                  <p
                    className={`text-sm font-semibold truncate ${activeRepo?.id === repo.id ? "text-[#c0c1ff]" : "text-[#e8e6f5]"}`}
                  >
                    {repo.name}
                  </p>
                  {repo.chunks > 0 && (
                    <p className="text-[11px] text-[#464555] font-mono">
                      {repo.chunks} chunks
                    </p>
                  )}
                </div>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] shrink-0" />
            </button>
          ))}
        </div>

        {user && (
          <div className="border-t border-[#464555]/20 pt-3 mt-3 shrink-0">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#1e2740] transition-colors cursor-pointer">
              <Avatar user={user} size={8} />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#e8e6f5] truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-[#464555] font-mono truncate">
                  @{user.username}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
