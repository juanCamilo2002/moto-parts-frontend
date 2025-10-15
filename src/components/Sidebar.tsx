"use client";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter, usePathname } from "next/navigation";

const drawerWidth = 240;

const menuItems = [
  { text: "Inicio", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Productos", icon: <CategoryIcon />, path: "/dashboard/products" },
  { text: "Clientes", icon: <PeopleIcon />, path: "/dashboard/customers" },
  { text: "Carritos de compra", icon: <ShoppingCartIcon />, path: "/dashboard/cart" },
  { text: "Pedidos", icon: <ShoppingBagIcon />, path: "/dashboard/orders" },
];

export default function Sidebar({ mobileOpen, onClose }: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* HEADER */}
      <Box>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: 2,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              letterSpacing: 1,
              color: (theme) =>
                theme.palette.mode === "light" ? "#1976d2" : "#90caf9",
            }}
          >
            MotoParts
          </Typography>

          {/* Botón cerrar solo en móvil */}
          <IconButton sx={{ display: { sm: "none" } }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>

        {/* MENU */}
        <List>
          {menuItems.map((item) => {
            const selected = pathname === item.path;
            return (
              <ListItemButton
                key={item.text}
                onClick={() => {
                  router.push(item.path);
                  onClose();
                }}
                selected={selected}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 2,
                  transition: "all 0.2s ease",
                  backgroundColor: selected ? "primary.main" : "transparent",
                  color: selected ? "#000" : "inherit",
                  "&:hover": {
                    backgroundColor: selected
                      ? "primary.dark"
                      : "rgba(25, 118, 210, 0.08)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selected ? "#000" : "primary.main",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: selected ? "bold" : 500,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          fontSize: 12,
          color: "text.secondary",
        }}
      >
        <Typography variant="caption" color="inherit">
          © {new Date().getFullYear()} MotoParts
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Permanente en escritorio */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? "#f9f9fb" : "#1e1e2f",
            color: (theme) =>
              theme.palette.mode === "light" ? "#111" : "#fff",
            borderRight: "none",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Temporal en móvil */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? "#f9f9fb" : "#1e1e2f",
            color: (theme) =>
              theme.palette.mode === "light" ? "#111" : "#fff",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export { drawerWidth };
