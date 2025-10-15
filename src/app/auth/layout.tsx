import { Viewport } from 'next';
import React from 'react'

export const viewport: Viewport = {
  themeColor: '#000000',
};

export const metadata = {
  title: 'Dashboard',
};

const AuthLayout = ({children}: Readonly<{ children: React.ReactNode;}>) => {
  return (
   <div> {children}</div>
  )
}

export default AuthLayout