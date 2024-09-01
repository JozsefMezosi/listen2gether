"use client";
import Link from "next/link";
import { RightNavGroup } from "./right-nav-group";
import { usePathname } from "next/navigation";
import { publicPages } from "@/models/public-pages";
export const Navbar = () => {
    const pathName = usePathname();
    if (publicPages.includes(pathName)) {
        return null;
    }

    return (
        <nav className="p-4 border-b flex items-center justify-between">
            <div>
                <Link href="/">Rooms</Link>
            </div>

            <RightNavGroup />
        </nav>
    );
};
