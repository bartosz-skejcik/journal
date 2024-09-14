import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "@/types/database";

interface UserWithPassword extends User {
    password: string;
}

interface UserStore {
    user: UserWithPassword | null;
    isLoading: boolean;
    error: string | null;
    createUser: (user: Omit<UserWithPassword, "created_at">) => void;
    updateUser: (user: UserWithPassword) => void;
    deleteUser: () => void;
    login: (email: string, password: string) => Promise<boolean>;
    fetchUser: () => void;
}

const getInitialState = (): Pick<UserStore, "user" | "isLoading" | "error"> => {
    if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user-storage");
        if (storedUser) {
            try {
                const { state } = JSON.parse(storedUser);
                if (state && state.user) {
                    return {
                        user: state.user,
                        isLoading: false,
                        error: null,
                    };
                }
            } catch (error) {
                console.error("Error parsing stored user:", error);
            }
        }
    }
    return { user: null, isLoading: false, error: null };
};

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            ...getInitialState(),
            createUser: (user: Omit<UserWithPassword, "created_at">) => {
                const newUser: UserWithPassword = {
                    ...user,
                    created_at: new Date().toISOString(),
                };
                set({ user: newUser });
            },
            updateUser: (user: UserWithPassword) => {
                set({ user });
            },
            deleteUser: () => {
                set({ user: null });
            },
            login: async (email: string, password: string) => {
                const storedUser = localStorage.getItem("user-storage");
                if (storedUser) {
                    try {
                        const { state } = JSON.parse(storedUser);
                        if (
                            state &&
                            state.user &&
                            state.user.email === email &&
                            state.user.password === password
                        ) {
                            set({
                                user: state.user,
                                isLoading: false,
                                error: null,
                            });
                            return true;
                        }
                    } catch (error) {
                        console.error("Error parsing stored user:", error);
                    }
                }
                set({ error: "Invalid email or password" });
                return false;
            },
            fetchUser: () => {
                const storedUser = localStorage.getItem("user-storage");
                if (storedUser) {
                    try {
                        const { state } = JSON.parse(storedUser);
                        if (state && state.user) {
                            set({
                                user: state.user,
                                isLoading: false,
                                error: null,
                            });
                            return;
                        }
                    } catch (error) {
                        console.error("Error parsing stored user:", error);
                    }
                }
                set({
                    user: null,
                    isLoading: false,
                    error: "User not found in storage",
                });
            },
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// Initialize the store on the client-side
if (typeof window !== "undefined") {
    const initialState = getInitialState();
    useUserStore.setState(initialState);
}

export default useUserStore;
