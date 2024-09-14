import { Notebook } from "@/types/database";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface NotebookStore {
    notebooks: Notebook[];
    getNotebooks: () => void;
    createNotebook: (notebook: Notebook) => void;
}

const useNotebookStore = create<NotebookStore>()(
    persist(
        (set) => ({
            notebooks: [] as Notebook[],
            getNotebooks: () => {
                const storedNotebooks =
                    localStorage.getItem("notebook-storage");
                if (storedNotebooks) {
                    try {
                        const { state } = JSON.parse(storedNotebooks);
                        if (state && state.notebooks) {
                            set({ notebooks: state.notebooks });
                        }
                    } catch (error) {
                        console.error("Error parsing stored notebooks:", error);
                    }
                }
            },
            createNotebook: (notebook: Notebook) => {
                set((state) => ({
                    notebooks: [...state.notebooks, notebook],
                }));
            },
        }),
        {
            name: "notebook-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// Initialize the store and fetch notebooks on the client-side
if (typeof window !== "undefined") {
    useNotebookStore.getState().getNotebooks();
}

export default useNotebookStore;
