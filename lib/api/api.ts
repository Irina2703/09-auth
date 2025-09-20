import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const nextServer = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

// Типы для заметки
export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export type NoteInput = {
    title: string;
    content: string;
    tag: NoteTag;
};

export type Note = {
    id: string;
    title: string;
    content: string;
    tag: NoteTag;
    createdAt: string;
    updatedAt: string;
};

// 📌 Функция создания заметки
export async function createNote(note: NoteInput) {
    const response = await nextServer.post("/notes", note);
    return response.data as Note;
}

// 📌 Функция получения всех заметок
export async function fetchNotes() {
    const response = await nextServer.get("/notes");
    return response.data as Note[];
}
