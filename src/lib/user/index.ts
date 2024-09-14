import { User } from "@/types/database";
import { getDB } from "@/lib/db";

function validateUser(user: Omit<User, "created_at">): void {
    if (!user.id || typeof user.id !== "number") {
        throw new Error("Invalid user ID");
    }
    if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        throw new Error("Invalid email address");
    }
    if (!user.display_name || user.display_name.length < 2) {
        throw new Error("Display name must be at least 2 characters long");
    }
}

export async function createUser(
    user: Omit<User, "created_at">
): Promise<User> {
    validateUser(user);
    const db = await getDB();
    const existingUser = await db.get("users", user.id);
    if (existingUser) {
        throw new Error("User with this ID already exists");
    }
    const newUser: User = {
        ...user,
        created_at: new Date().toISOString(),
    };
    await db.add("users", newUser);
    return newUser;
}

export async function getUser(id: number): Promise<User | undefined> {
    if (!id || typeof id !== "number") {
        throw new Error("Invalid user ID");
    }
    const db = await getDB();
    return db.get("users", id);
}

export async function updateUser(user: User): Promise<void> {
    validateUser(user);
    const db = await getDB();
    const existingUser = await db.get("users", user.id);
    if (!existingUser) {
        throw new Error("User not found");
    }
    await db.put("users", user);
}

export async function deleteUser(id: number): Promise<void> {
    if (!id || typeof id !== "number") {
        throw new Error("Invalid user ID");
    }
    const db = await getDB();
    const existingUser = await db.get("users", id);
    if (!existingUser) {
        throw new Error("User not found");
    }
    await db.delete("users", id);
}
