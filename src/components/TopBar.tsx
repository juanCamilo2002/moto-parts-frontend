"use client";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthStore } from "@/modules/auth/store/authStore";
import { authService } from "@/modules/auth/services/authService";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await authService.logout();
    logout();
    router.push('/auth/login')
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MotoParts Dashboard
        </Typography>
        <Typography sx={{ mr: 2 }}>{user?.email}</Typography>
        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
