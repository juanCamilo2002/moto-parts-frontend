import DashboardLayout from '@/components/DashboardLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Metadata, Viewport } from 'next';
import React, { ReactNode } from 'react'


interface Props {
    children: ReactNode
}


const DashboardLayoutComponent = ({ children }: Props) => {
    return (
        <ProtectedRoute>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </ProtectedRoute>
    )
}

export default DashboardLayoutComponent