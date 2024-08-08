'use client'

import { getMe } from "../services/user";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // getMe()
    return (
        <>{children}</>
    );
}
