import { create } from "zustand";

const useAppStore = create((set) => ({
  repos: [],
  activeRepo: null,
  messages: {},
  loading: false,
  modalOpen: false,

  setActiveRepo: (repo) => set({ activeRepo: repo }),

  addRepo: (repo) =>
    set((state) => ({
      repos: [...state.repos, repo],
      messages: { ...state.messages, [repo.id]: [] },
    })),

  addMessage: (repoId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [repoId]: [...(state.messages[repoId] || []), message],
      },
    })),

  appendLastMessage: (repoId, text) =>
    set((state) => {
      const msgs = [...(state.messages[repoId] || [])];
      const last = { ...msgs[msgs.length - 1] };
      last.text += text;
      msgs[msgs.length - 1] = last;
      return { messages: { ...state.messages, [repoId]: msgs } };
    }),

  setLoading: (val) => set({ loading: val }),
  setModalOpen: (val) => set({ modalOpen: val }),
  sidebarOpen: true,
  setSidebarOpen: (val) => set({ sidebarOpen: val }),
}));

export default useAppStore;
