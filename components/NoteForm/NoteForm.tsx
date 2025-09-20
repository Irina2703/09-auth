"use client";

// Make sure useNoteStore is exported from noteStore.ts, or import the correct export
import { useNoteStore } from "@/lib/store/noteStore";
// If the export is default, use:
// import useNoteStore from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";

// Добавляем тип для тега
type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

type NoteFormProps = {
    onClose: () => void;
};

export default function NoteForm({ onClose }: NoteFormProps) {
    const { draft, setDraft, clearDraft } = useNoteStore();
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft();
            onClose(); // закрываем модалку после успешного создания
        },
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        if (name === "tag") {
            setDraft({ ...draft, [name]: value as NoteTag });
        } else {
            setDraft({ ...draft, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Приводим tag к нужному типу перед отправкой
        mutation.mutate({
            ...draft,
            tag: draft.tag as NoteTag,
        });
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    value={draft.title}
                    onChange={handleChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    rows={8}
                    value={draft.content}
                    onChange={handleChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select
                    name="tag"
                    value={draft.tag}
                    onChange={handleChange}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
                <button
                    type="button"
                    className={css.cancelButton}
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={mutation.status === "pending"}
                >
                    {mutation.status === "pending" ? "Creating..." : "Create note"}
                </button>
            </div>
        </form>
    );
}