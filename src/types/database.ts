export interface Notebook {
    id: number;
    user_id: number;
    name: string;
    created_at: string;
}

export interface User {
    id: number;
    email: string;
    display_name: string;
    created_at: string;
}

export interface UserWithPassword extends User {
    password: string;
}

export interface Category {
    id: number;
    notebook_id: number;
    user_id: number;
    name: string;
    // the color is a hex
    color: string;
}

export interface Entry {
    id: number;
    notebook_id: number;
    author_id: number;
    tag_id: number;
    title: string;
    content: string;
    // either user or assistant
    role: string;
    timestamp: string;
    parent_entry_id: number;
    has_photo: boolean;
}

export interface StickyNote {
    id: number;
    notebook_id: number;
    category_id: number;
    author_id: number;
    title: string;
    content: string;
    created_at: string;
}

export interface Tag {
    id: number;
    // This is the value but with spaces and capitalization of the first letter
    label: string;
    value: "none" | "new-idea" | "highlight" | "do-later";
    // a css variable: --muted, --orange, --blue, --green
    color: string;
}

export interface Photo {
    id: number;
    entry_id: number;
    author_id: number;
    image_data: Blob;
    mime_type: string;
    uploaded_at: string;
}
