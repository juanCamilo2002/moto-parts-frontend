import ProtectedRoute from '@/components/ProtectedRoute'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    )
}

export default DashboardLayout