"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe, login, register, updateProfile } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
    const router = useRouter();
    const { user, setUser } = useAuthStore();
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            getMe().then((u) => {
                if (u) {
                    setUser(u);
                    setUsername(u.username);
                    setEmail(u.email);
                }
            });
        }
    }, [user, setUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedUser = await updateProfile({ username, email });
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
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
