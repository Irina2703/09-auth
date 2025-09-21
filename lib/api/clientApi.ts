import type { Note } from "@/types/note";
import { nextServer } from "./api";
import type { User } from "@/types/user";

// ✅ Типи
export interface NoteResponse {
    notes: Note[];
    totalPages: number;
}

export interface CreateNoteParams {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export type RegisterRequest = {
    email: string;
    password: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type UpdateMeRequest = {
    username?: string;
    email?: string;
};

// ✅ AUTH
export async function getMe(): Promise<User | null> {
    try {
        const res = await nextServer.get<User>("users/me");
        return res.data;
    } catch {
        return null;
    }
}

export async function updateProfile(data: UpdateMeRequest): Promise<User> {
    const res = await nextServer.patch<User>("users/me", data);
    return res.data;
}

export async function register(data: RegisterRequest): Promise<User> {
    const res = await nextServer.post<User>("auth/register", data);
    return res.data;
}

export async function login(data: LoginRequest): Promise<User> {
    const res = await nextServer.post<User>("auth/login", data);
    return res.data;
}

export async function logout(): Promise<void> {
    await nextServer.post("auth/logout");
}

export async function checkSession(): Promise<{ authenticated: boolean }> {
    const res = await nextServer.get<{ authenticated: boolean }>("auth/session");
    return res.data;
}

// ✅ NOTES
export async function createNote(newNote: CreateNoteParams): Promise<Note> {
    const res = await nextServer.post<Note>("/notes", newNote);
    return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const res = await nextServer.delete<Note>(`/notes/${id}`);
    return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const res = await nextServer.get<Note>(`/notes/${id}`);
    return res.data;
}

export async function fetchNotes(
    page: number,
    query: string,
    tag?: string
): Promise<NoteResponse> {
    const params = {
        params: {
            search: query,
            tag: tag,
            page: page,
            perPage: 12,
        },
    };
    const res = await nextServer.get<NoteResponse>("/notes", params);
    return res.data;
}

// ✅ TAGS (якщо потрібно)
export interface Tag {
    id: string;
    name: string;
}

export async function getTagsClient(): Promise<Tag[]> {
    const res = await nextServer.get<Tag[]>("/tags");
    return res.data;
}
