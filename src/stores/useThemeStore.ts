import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { themes, DEFAULT_THEME } from "@/themes";
import { applyTheme } from "@/lib/themes";

interface ThemeState {
    theme: string;
    setTheme: (newTheme: string) => void;
}

const getInitialTheme = (): string => {
    if (typeof window !== "undefined") {
        const storedTheme = localStorage.getItem("theme-storage");
        if (storedTheme) {
            try {
                const { state } = JSON.parse(storedTheme);
                if (
                    state &&
                    state.theme &&
                    themes.hasOwnProperty(state.theme)
                ) {
                    return state.theme;
                }
            } catch (error) {
                console.error("Error parsing stored theme:", error);
            }
        }
    }
    return DEFAULT_THEME;
};

const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: getInitialTheme(),
            setTheme: (newTheme: string) => {
                if (themes.hasOwnProperty(newTheme)) {
                    set({ theme: newTheme });
                    if (typeof window !== "undefined") {
                        applyTheme(themes[newTheme]);
                    }
                }
            },
        }),
        {
            name: "theme-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// Apply the theme on the client-side
if (typeof window !== "undefined") {
    const currentTheme = useThemeStore.getState().theme;
    applyTheme(themes[currentTheme]);
}

export default useThemeStore;
