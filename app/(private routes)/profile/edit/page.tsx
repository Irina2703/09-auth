"use client";

import { useState, useEffect, ChangeEvent, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { updateUsernameAction } from "./actions";

export default function EditProfilePage() {
    const router = useRouter();
    const { user, setUser } = useAuthStore();

    const [username, setUsername] = useState(user?.username ?? "");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!user) {
            getMe()
                .then((u) => {
                    if (u) setUser(u);
                })
                .catch((err) => console.error("Failed to fetch user:", err));
        } else {
            setUsername(user.username);
        }
    }, [user, setUser]);

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Edit Profile</h1>

            {user?.avatar && (
                <Image
                    src={user.avatar}
                    alt="User avatar"
                    width={120}
                    height={120}
                    style={{ borderRadius: "50%", marginBottom: "1rem" }}
                />
            )}

            <form
                action={async (formData: FormData) => {
                    try {
                        const newUser = await updateUsernameAction(formData);

                        // обновляем глобальный store и делаем переход
                        startTransition(() => {
                            setUser(newUser);
                            router.push("/profile");
                        });
                    } catch (err) {
                        console.error("Failed to update profile:", err);
                    }
                }}
                style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px" }}
            >
                <label>
                    Username:
                    <input
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        required
                        style={{ marginLeft: "0.5rem" }}
                    />
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        value={user?.email ?? ""}
                        readOnly
                        style={{ marginLeft: "0.5rem" }}
                    />
                </label>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Save"}
                    </button>
                    <button type="button" onClick={() => router.push("/profile")}>
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
}
