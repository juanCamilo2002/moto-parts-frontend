'use client';
import LogoutButton from '@/components/LogoutButton'
import { useAuthStore } from '@/modules/auth/store/authStore'
import React from 'react'

const DashboardPage = () => {
    const { user } = useAuthStore();
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">👋 Bienvenido, {user?.email}</h1>
                <p className="text-gray-600 mb-6">
                    Has iniciado sesión correctamente en <span className="font-semibold">MotoParts</span>.
                </p>
                <LogoutButton />
            </div>
        </div>
    )
}

export default DashboardPage