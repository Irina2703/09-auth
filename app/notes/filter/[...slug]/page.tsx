import css from "./NotesClient.module.css";
import NoteListClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const tag = slug[0] === "All" ? undefined : slug[0];

    return {
        title: tag ? `Notes tagged: ${tag}` : "All Notes",
        description: tag ? `Browse notes with tag: ${tag}` : "Browse all notes",
        openGraph: {
            title: tag ? `Notes tagged: ${tag}` : "All Notes",
            description: tag ? `Browse notes with tag: ${tag}` : "Browse all notes",
            url: `/notes/filter/${tag ?? "All"}`,
            images: [
                {
                    url: "/og-default.png",
                    width: 800,
                    height: 600,
                    alt: "Notes OG Image",
                },
            ],
        },
    };
}

export default async function NotesPage({ params }: Props) {
    const queryClient = new QueryClient();
    const { slug } = await params;
    const tag = slug[0] === "All" ? undefined : slug[0];

    await queryClient.prefetchQuery({
        queryKey: ["notes", { query: "", page: 1, tag }],
        queryFn: () => fetchNotes(1, tag ?? ""),
    });

    return (
        <div className={css.app}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NoteListClient tag={tag} />
            </HydrationBoundary>
        </div>
    );
}
