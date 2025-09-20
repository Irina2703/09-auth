"use client";

import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api/api";

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
            onClose();
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
                <label htmlFor="title">Заголовок</label>
                <input
                    id="title"
                    name="title"
                    value={draft.title}
                    onChange={handleChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Содержание</label>
                <textarea
                    id="content"
                    name="content"
                    rows={8}
                    value={draft.content}
                    onChange={handleChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Тег</label>
                <select
                    name="tag"
                    value={draft.tag}
                    onChange={handleChange}
                >
                    <option value="Todo">Дела</option>
                    <option value="Work">Работа</option>
                    <option value="Personal">Личное</option>
                    <option value="Meeting">Встреча</option>
                    <option value="Shopping">Покупки</option>
                </select>
            </div>

            <div className={css.actions}>
                <button
                    type="button"
                    className={css.cancelButton}
                    onClick={handleCancel}
                >
                    Отмена
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={mutation.status === "pending"}
                >
                    {mutation.status === "pending" ? "Создание..." : "Создать заметку"}
                </button>
            </div>
        </form>
    );
}