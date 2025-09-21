// actions.ts
"use server";
import { updateProfile } from "@/lib/api/clientApi";

export async function updateUsernameAction(formData: FormData) {
    const username = formData.get("username") as string;
    return updateProfile({ username });
}
