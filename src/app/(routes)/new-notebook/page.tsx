"use client";

import useNotebookStore from "@/stores/useNotebookStore";
import { Button } from "@ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { ArrowLeft } from "lucide-react";
import React, { FormEvent } from "react";
import { redirect } from "next/navigation";
import { Notebook } from "@/types/database";
import useUserStore from "@/stores/useUserStore";

// type Props = {}

function Page({}) {
    const { createNotebook } = useNotebookStore();
    const { user } = useUserStore();

    function onCancel() {
        redirect("/");
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const name = formData.get("name") as string;

        if (!name) {
            console.error("Notebook name is required");
            return;
        }

        if (!user) return;

        const newNotebook: Notebook = {
            id: Date.now(),
            user_id: user.id,
            name,
            created_at: new Date().toISOString(),
        };

        createNotebook(newNotebook);

        // Redirect to the home page after creating the notebook
        redirect("/");
    }

    return (
        <main className="flex flex-col items-center justify-center flex-1 w-full h-screen px-20 text-center gap-y-12">
            <form onSubmit={handleSubmit}>
                <Card className="w-full max-w-sm bg-transparent border-none shadow-none text-start">
                    <CardHeader className="w-full">
                        <CardTitle className="w-full text-2xl text-start">
                            Create a new notebook
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="name"
                                className="flex flex-col items-start font-semibold text-[0.9em]"
                            >
                                <p>Name</p>
                                <p className="text-sm font-normal text-muted-foreground">
                                    Pick a name for your notebook
                                </p>
                            </Label>
                            <Input
                                id="name"
                                className="col-span-3"
                                name="name"
                                type="text"
                                placeholder="eg. Personal, School, Work"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="grid grid-cols-3 gap-2">
                        <Button
                            variant="secondary"
                            className="flex items-center justify-center col-span-1 gap-2"
                            onClick={onCancel}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Button>
                        <Button type="submit" className="col-span-2">
                            Create
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </main>
    );
}

export default Page;
