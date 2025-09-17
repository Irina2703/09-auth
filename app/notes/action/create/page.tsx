"use client";

import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";

const BASE_URL = "08-zustand-olive-rho.vercel.app";

export const metadata: Metadata = {
    title: "Create Note",
    description: "Create a new note in your collection",
    openGraph: {
        title: "Create Note",
        description: "Form for creating a new note",
        url: `${BASE_URL}/notes/action/create`,
        images: [
            {
                url: `${BASE_URL}/og-create-note.png`,
                width: 800,
                height: 600,
                alt: "Create Note",
            },
        ],
    },
};

export default function CreateNotePage() {
    return (
        <main>
            <h1>Create a New Note</h1>
            <NoteForm onClose={() => { }} />
        </main>
    );
}
