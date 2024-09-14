"use client";

import { useEffect, useState } from "react";
import { Button } from "@ui/button";
import { ArrowRight } from "lucide-react";
import useUserStore from "@/stores/useUserStore";
import useNotebookStore from "@/stores/useNotebookStore";
import Image from "next/image";
import NotebookButton from "../notebook/button";
import { redirect } from "next/navigation";

function Welcome() {
    const { notebooks } = useNotebookStore();
    const { user, isLoading, fetchUser } = useUserStore();
    const [openedNotebook, setOpenedNotebook] = useState<number | null>(null);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        if (!user) {
            redirect("/register");
        }
    }, [user, isLoading]);

    function toggleNotebook(i: number) {
        if (openedNotebook === i) {
            setOpenedNotebook(null);
        } else {
            setOpenedNotebook(i);
        }
    }

    return (
        <main className="flex flex-col items-center justify-center flex-1 w-full h-screen px-20 text-center gap-y-12">
            <div className="flex flex-col items-center space-y-4 text-foreground">
                <Image
                    height={200}
                    width={200}
                    src="/logo.png"
                    alt="logo"
                    className="w-36 h-36"
                    priority
                />
                <h1 className="text-3xl xl:text-4xl">
                    {user!.display_name.split(" ")[0]}
                    {"'"}s journal
                </h1>
            </div>
            <Button
                className="flex items-center justify-center gap-2"
                variant="default"
                onClick={() => (window.location.href = "/new-notebook")}
            >
                <span>Create a new notebook</span>
                <ArrowRight className="w-4 h-4" />
            </Button>
            <div className="flex flex-col items-center w-full max-w-xs space-y-4">
                {notebooks.length > 0 && (
                    <p className="text-muted-foreground">
                        or open an existing one
                    </p>
                )}
                <div className="relative z-10 flex flex-col items-center justify-center w-full rounded-lg gap-y-0.5 divide-background">
                    {notebooks &&
                        notebooks.map((notebook, i) => (
                            <NotebookButton
                                key={i}
                                notebook={notebook}
                                i={i}
                                toggleNotebook={toggleNotebook}
                                open={openedNotebook === i}
                            />
                        ))}
                </div>
            </div>

            <div className="flex items-center justify-center w-full gap-5">
                <a
                    href="https://github.com/bartosz-skejcik/notes"
                    className="text-muted-foreground hover:text-foreground"
                >
                    Github
                </a>
            </div>
        </main>
    );
}

export default Welcome;
