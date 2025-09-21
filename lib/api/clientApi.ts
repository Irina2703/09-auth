import { nextServer } from "./api";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";

// ✅ Типи
export interface Tag {
    id: string;
    name: string;
}

export interface NoteResponse {
    notes: Note[];
    totalPages: number;
}

export type LoginRequest = { email: string; password: string };
export type RegisterRequest = { email: string; password: string };
export type CreateNoteParams = {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};

export type UpdateProfileParams = {
    username: string;
    email: string;
};

// ✅ AUTH
export async function login(data: LoginRequest): Promise<User> {
    const res = await nextServer.post<User>("/auth/login", data);
    return res.data;
}

export async function register(data: RegisterRequest): Promise<User> {
    const res = await nextServer.post<User>("/auth/register", data);
    return res.data;
}

export async function getMe(): Promise<User | null> {
    try {
        const res = await nextServer.get<User>("/users/me");
        return res.data;
    } catch {
        return null;
    }
}

export async function updateProfile(data: UpdateProfileParams): Promise<User> {
    const res = await nextServer.put<User>("/users/me", data);
    return res.data;
}

export async function logout(): Promise<void> {
    await nextServer.post("/auth/logout");
}

export async function checkSession(): Promise<boolean> {
    try {
        const res = await nextServer.get("/auth/session");
        return Boolean(res.data.authenticated);
    } catch {
        return false;
    }
}

// ✅ NOTES
export async function createNote(data: CreateNoteParams): Promise<Note> {
    const res = await nextServer.post<Note>("/notes", data);
    return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const res = await nextServer.get<Note>(`/notes/${id}`);
    return res.data;
}

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
    const res = await nextServer.get<NoteResponse>(`/notes?${params.toString()}`);
    return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const res = await nextServer.delete<Note>(`/notes/${id}`);
    return res.data;
}

// ✅ TAGS (за потреби)
export async function getTagsClient(): Promise<Tag[]> {
    const res = await nextServer.get<Tag[]>("/tags");
    return res.data;
}
