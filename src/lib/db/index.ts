import { openDB, DBSchema, IDBPDatabase } from "idb";
import { User } from "@/types/database";

interface MyDB extends DBSchema {
    users: {
        key: number;
        value: User;
    };
    // Add other object stores as needed
}

let db: IDBPDatabase<MyDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<MyDB>> {
    if (!db) {
        db = await openDB<MyDB>("notes", 1, {
            upgrade(db) {
                db.createObjectStore("users", { keyPath: "id" });
                // Create other object stores as needed
            },
        });
    }
    return db;
}

export async function closeDB(): Promise<void> {
    if (db) {
        db.close();
        db = null;
    }
}
