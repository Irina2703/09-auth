import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Draft = {
    title: string;
    content: string;
    tag: string;
};

interface NoteStore {
    draft: Draft;
    setDraft: (draft: Draft) => void;
    clearDraft: () => void;
}

const initialDraft: Draft = { title: '', content: '', tag: 'Todo' };

export const useNoteStore = create<NoteStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (draft) => set({ draft }),
            clearDraft: () => set({ draft: initialDraft }),
        }),
        { name: 'note-draft' }
    )
);
