"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getMe, updateProfile } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
    const router = useRouter();
    const { user, setUser } = useAuthStore();
    const [username, setUsername] = useState(user?.username ?? "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            getMe().then((u) => {
                if (u) {
                    setUser(u);
                    setUsername(u.username);
                }
            });
        }
    }, [user, setUser]);

    // функція, яку Next викличе при сабміті форми
    const updateUsernameAction = async (formData: FormData) => {
        "use server"; // серверна дія
        const newUsername = formData.get("username") as string;
        setLoading(true);
        try {
            const updatedUser = await updateProfile({ username: newUsername });
            setUser(updatedUser);
            router.push("/profile");
        } catch (err) {
            console.error("Failed to update profile:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h1>Edit Profile</h1>

            {user?.avatar && (
                <Image
                    src={user.avatar}
                    alt="User avatar"
                    width={120}
                    height={120}
                    style={{ borderRadius: "50%" }}
                />
            )}

            <form action={updateUsernameAction}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUsername(e.target.value)
                        }
                        required
                    />
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        value={user?.email ?? ""}
                        readOnly
                    />
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>

                <button type="button" onClick={() => router.back()}>
                    Cancel
                </button>
            </form>
        </main>
    );
}
