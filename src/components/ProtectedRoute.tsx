'use client';

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/modules/auth/store/authStore";

interface Props {
    children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated && !localStorage.getItem('access')) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, router]);
    return <>{children}</>
}
