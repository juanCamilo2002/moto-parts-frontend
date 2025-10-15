"use client";
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

const Providers = ({children}: Props) => {
  return (
     <QueryClientProvider client={queryClient}>
      <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={3000}
        >
          {children}
        </SnackbarProvider>
    </QueryClientProvider>
  )
}

export default Providers