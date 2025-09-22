"use client";

import css from "./Header.module.css";
import Link from "next/link";
import TagsMenu from "@/components/TagsMenu/TagsMenu";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

export default function Header() {
    return (
        <header className={css.header}>
            <Link href="/" aria-label="Home">
                NoteHub
            </Link>

            <nav aria-label="Main Navigation">
                <ul className={css.navigation}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>

                    <li>
                        <TagsMenu />
                    </li>

                    {/* ↓ Здесь появятся кнопки Login/Sign-up или Profile/Logout */}
                    <AuthNavigation />
                </ul>
            </nav>
        </header>
    );
}
