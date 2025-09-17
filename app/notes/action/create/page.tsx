"use client";

import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";

const BASE_URL = "https://08-zustand-olive-rho.vercel.app";

export const metadata: Metadata = {
    title: "Create Note",
    description: "Create a new note in your collection",
    openGraph: {
        title: "Create Note",
        description: "Form for creating a new note",
        url: `${BASE_URL}/notes/action/create`,
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
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
