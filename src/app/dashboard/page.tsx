"use client";

import { Typography, Paper, Box } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        Bienvenido al sistema MotoParts 🏍️
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography>Selecciona un módulo desde el menú lateral para comenzar.</Typography>
      </Paper>
    </Box>
  );
}
