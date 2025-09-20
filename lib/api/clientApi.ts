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

export type CreateNoteParams = {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};

// ✅ LOGIN
export async function login(data: LoginRequest): Promise<User> {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    return res.json();
}

// ✅ REGISTER
export async function register(data: RegisterRequest): Promise<User> {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Registration failed");
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

// ✅ CREATE NOTE
export async function createNote(data: CreateNoteParams): Promise<Note> {
    const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create note");
    return res.json();
}

// ✅ FETCH NOTES
export async function fetchNotes(
    page: number,
    search: string,
    tag?: string
): Promise<NoteResponse> {
    const params = new URLSearchParams({
        page: String(page),
        search,
        ...(tag ? { tag } : {}),
    });
    const res = await fetch(`/api/notes?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch notes");
    return res.json();
}

// ✅ DELETE NOTE
export async function deleteNote(id: string): Promise<void> {
    const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete note");
}

// ✅ CHECK SESSION  🔹 добавлено
export async function checkSession(): Promise<boolean> {
    const res = await fetch("/api/auth/session", {
        method: "GET",
        credentials: "include", // чтобы cookie передавались
    });
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data.authenticated);
}

// ✅ GET CURRENT USER  🔹 добавлено
export async function getMe(): Promise<User | null> {
    const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) return null;
    return res.json();
}
// ✅ LOGOUT
export async function logout(): Promise<void> {
    const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // чтобы отправились cookie
    });
    if (!res.ok) throw new Error("Logout failed");
}
