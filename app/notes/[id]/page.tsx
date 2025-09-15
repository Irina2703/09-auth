import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>;
};

// 🆕 Генеруємо метадані динамічно
export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { id } = await params;
    const note = await fetchNoteById(id);

    return {
        title: note?.title ?? "Note not found",
        description: note?.content?.slice(0, 120) ?? "Details about the note",
        openGraph: {
            title: note?.title ?? "Note",
            description: note?.content?.slice(0, 120) ?? "Note details",
            url: `/notes/${id}`,
        },
    };
}

export default async function NoteDetails({ params }: Props) {
    const { id } = await params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
}
