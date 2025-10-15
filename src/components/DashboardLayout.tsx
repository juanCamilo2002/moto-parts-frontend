"use client";

import { Box, CssBaseline, Toolbar, ThemeProvider } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";
import theme from "@/theme/theme";
import ProtectedRoute from "./ProtectedRoute";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Topbar />
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </ProtectedRoute>
  );
}
