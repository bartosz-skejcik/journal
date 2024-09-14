"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import localFont from "next/font/local";
import "@/app/globals.css";
import useThemeStore from "@/stores/useThemeStore";
import { useEffect } from "react";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { theme, setTheme } = useThemeStore();

    useEffect(() => {
        console.log(theme);
        setTheme(theme);
    }, []);

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function() {
                            try {
                            var theme = localStorage.getItem('theme');
                            if (theme) {
                                theme = JSON.parse(theme).state.theme;
                                document.documentElement.setAttribute('data-theme', theme);
                            }
                            } catch (e) {}
                        })();
                        `,
                    }}
                />
                {children}
            </body>
        </html>
    );
}
