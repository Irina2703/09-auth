import type { User } from "@/types/user";
import type { Note } from "@/types/note";

export interface Tag {
    id: string;
    name: string;
}

export interface NoteResponse {
    notes: Note[];
    totalPages: number;
}

export type RegisterRequest = {
    email: string;
    password: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

// ✅ LOGIN
export async function login(data: LoginRequest): Promise<User> {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Invalid credentials");
    }

    return res.json();
}

// ✅ REGISTER
export async function register(data: RegisterRequest): Promise<User> {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Registration failed");
    }

    return res.json();
}

// ✅ FETCH TAGS
export async function getTagsClient(): Promise<Tag[]> {
    const res = await fetch("/api/tags");
    if (!res.ok) throw new Error("Failed to fetch tags");
    return res.json();
}

// ✅ FETCH NOTE BY ID
export async function fetchNoteById(id: string): Promise<Note> {
    const res = await fetch(`/api/notes/${id}`);
    if (!res.ok) throw new Error("Failed to fetch note");
    return res.json();
}
