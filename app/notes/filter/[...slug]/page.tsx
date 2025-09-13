import css from "./NotesClient.module.css";
import NoteListClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";

type Props = {
    params: Promise<{ slug: string[] }>;
};

export default async function App({ params }: Props) {
    const queryClient = new QueryClient();
    const { slug } = await params;

    const tag = slug[0] === "All" ? undefined : slug[0]; // undefined = всі нотатки

    await queryClient.prefetchQuery({
        queryKey: ["notes", { query: "", page: 1, tag }],
        queryFn: () => fetchNotes(1, tag ?? ""), // передаємо тег
    });

    return (
        <div className={css.app}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NoteListClient tag={tag} />
            </HydrationBoundary>
        </div>
    );
}
