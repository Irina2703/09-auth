"use client";

import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
    title: "New note",
    description: "Here you can add a new notes and save it for later reference ",
    openGraph: {
        title: "New note",
        description: "Here you can add a new notes and save it for later reference",
        url: "https://notehub.versel.app/notes/action/create",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub",
            },
        ],
    },
};

export default function CreateNote() {
    const router = useRouter();

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                {/* Передаём обязательный проп onClose */}
                <NoteForm onClose={() => router.push("/notes")} />
            </div>
        </main>
    );
}
