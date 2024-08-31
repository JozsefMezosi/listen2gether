"use client";

import { FunctionComponent, ReactNode } from "react";

interface AuthGuardProps {
    children: ReactNode;
}
export const AuthGuard: FunctionComponent<AuthGuardProps> = ({ children }) => {
    return <>{children}</>;
};
