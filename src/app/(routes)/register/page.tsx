"use client";

import useUserStore from "@/stores/useUserStore";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@ui/card";
import { UserWithPassword } from "@/types/database";
import { Label } from "@ui/label";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { redirect } from "next/navigation";

export default function Register() {
    const { createUser } = useUserStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const displayName = `${firstName} ${lastName}`.trim();

        if (!email || !displayName || !password) {
            console.error("Missing required fields");
            return;
        }

        const newUser: Omit<UserWithPassword, "created_at"> = {
            id: Date.now(),
            email,
            display_name: displayName,
            password,
        };

        createUser(newUser);
        redirect("/"); // Redirect to home page after successful registration
    };

    return (
        <main className="flex flex-col items-center justify-center flex-1 w-full h-screen px-20 text-center gap-y-12">
            <form onSubmit={handleSubmit}>
                <Card className="max-w-sm mx-auto bg-transparent border-none shadow-none text-start">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="first-name">
                                        First name
                                    </Label>
                                    <Input
                                        id="first-name"
                                        name="firstName"
                                        placeholder="Max"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input
                                        id="last-name"
                                        name="lastName"
                                        placeholder="Robinson"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Create an account
                            </Button>
                        </div>
                        <div className="mt-4 text-sm text-start">
                            Already have an account?
                            <a href="/login" className="underline">
                                {" "}
                                Sign in{" "}
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </main>
    );
}
