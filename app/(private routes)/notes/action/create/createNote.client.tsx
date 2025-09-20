"use client";

import NoteForm from "@/components/NoteForm/NoteForm";
import { getTagsClient } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function CreateNoteClient() {
    const { data: tags = [] } = useQuery({
        queryKey: ["tags"],
        queryFn: getTagsClient,
    });

    const router = useRouter();

    return (
        <NoteForm />
    );
}
