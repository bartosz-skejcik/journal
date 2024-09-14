import { Notebook } from "@/types/database";
import React from "react";
import { Button } from "@ui/button";
import { ChevronDown, NotebookTabs, StickyNote, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import useNotebookStore from "@/stores/useNotebookStore";

type Props = {
    notebook: Notebook;
    i: number;
    open: boolean;
    toggleNotebook: (i: number) => void;
};

function NotebookButton({ notebook, i, open, toggleNotebook }: Props) {
    const { notebooks } = useNotebookStore();

    return (
        <button
            onClick={() => toggleNotebook(i)}
            className={`relative flex-col flex items-center justify-center w-full gap-2 pt-1 pb-2 pl-3 pr-2 bg-accent opacity-80 hover:opacity-100 group ${
                i == notebooks.length - 1
                    ? "rounded-b-lg"
                    : i == 0
                    ? "rounded-t-lg"
                    : ""
            }`}
        >
            <div className="flex items-center justify-between w-full gap-2">
                <div className="relative z-20 flex flex-col items-start justify-center">
                    <span className="font-medium">{notebook.name}</span>
                    <span className="text-xs text-muted-foreground">
                        {new Date(notebook.created_at).toLocaleDateString(
                            "en-PL",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </span>
                </div>
                <div className="relative z-20 flex items-center gap-2">
                    <Button variant="red_ghost" className="px-3">
                        <Trash className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 outline outline-1 outline-muted-foreground hover:bg-muted-foreground/20"
                    >
                        <ChevronDown
                            className={`w-4 h-4 transition-all duration-200 ${
                                open ? "rotate-180" : ""
                            }`}
                        />
                    </Button>
                </div>
            </div>
            {open && (
                <div
                    // transition:slide={{ duration: 100, axis: 'y', easing: cubicInOut }}
                    className="flex items-center justify-start w-full gap-2"
                >
                    <Button
                        onClick={() => redirect(`/notebooks/${notebook.id}`)}
                        variant="ghost"
                        className="w-1/2 bg-foreground/10 hover:bg-foreground/20"
                    >
                        <NotebookTabs className="w-4 h-4 mr-2" />
                        Journal
                    </Button>
                    <Button
                        onClick={() => redirect(`/whiteboards/${notebook.id}`)}
                        variant="ghost"
                        className="w-1/2 bg-foreground/10 hover:bg-foreground/20"
                    >
                        <StickyNote className="w-4 h-4 mr-2" />
                        Notes
                    </Button>
                </div>
            )}
        </button>
    );
}

export default NotebookButton;
