import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar/navbar";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Listen2gether",
    description:
        "A site where you can listen music together with your friends.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    fontSans.className,
                    "min-h-screen bg-background antialiased",
                )}
            >
                <Navbar />
                <div className="p-3">{children}</div>
            </body>
        </html>
    );
}
