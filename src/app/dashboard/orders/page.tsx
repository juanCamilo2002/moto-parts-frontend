"use client";

import { useEffect } from "react";
import { useOrderStore } from "@/modules/orders/stores/ordersStore";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Grid,
  Chip,
  Divider,
  MenuItem,
  TextField,
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ShoppingCart, Person, AttachMoney } from "@mui/icons-material";



export default function OrdersPage() {
  const { orders, fetchOrders, updateStatus, loading } = useOrderStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = (orderId: number, newStatus: string) => {
    updateStatus(orderId, newStatus);
  };

  const statusColors: Record<string, "warning" | "info" | "success" | "error"> = {
    PENDING: "warning",
    PROCESSING: "info",
    COMPLETED: "success",
    CANCELLED: "error",
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        fontSize={{ xs: 24, sm: 28, md: 32 }}
      >
        📦 Pedidos
      </Typography>

      {/* Loading */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Typography color="text.secondary">No hay pedidos registrados aún.</Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid key={order.id} component={'div'} size={{xs: 12, sm: 6, md: 6}}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": { boxShadow: 5, transform: "translateY(-3px)" },
                }}
              >
                <CardHeader
                  avatar={<ShoppingCart color="primary" />}
                  title={`Pedido #${order.id}`}
                  titleTypographyProps={{
                    fontWeight: 600,
                    fontSize: { xs: 16, sm: 18 },
                  }}
                  subheader={new Date(order.created_at).toLocaleDateString()}
                  action={
                    <Chip
                      label={order.status}
                      color={statusColors[order.status] || "default"}
                      variant="filled"
                      sx={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    />
                  }
                />
                <Divider />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center" mb={1.5}>
                    <Person sx={{ mr: 1 }} color="action" />
                    <Typography variant="body1" fontSize={{ xs: 14, sm: 16 }}>
                      <strong>Cliente:</strong> {order.customer.first_name}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={2}>
                    <AttachMoney sx={{ mr: 1 }} color="success" />
                    <Typography
                      variant="h6"
                      color="success.main"
                      fontWeight="bold"
                      fontSize={{ xs: 16, sm: 18 }}
                    >
                      ${Number(order.total).toFixed(2)}
                    </Typography>
                  </Box>

                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    fontWeight="bold"
                    fontSize={{ xs: 13, sm: 14 }}
                  >
                    Productos:
                  </Typography>

                  {order.items_detail.map((item) => (
                    <Box
                      key={item.id}
                      display="flex"
                      justifyContent="space-between"
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        bgcolor: "grey.50",
                        mb: 0.7,
                      }}
                    >
                      <Typography variant="body2" fontSize={{ xs: 13, sm: 14 }}>
                        {item.product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        fontSize={{ xs: 13, sm: 14 }}
                      >
                        x{item.quantity} — ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>

                <Divider />

                <CardActions
                  sx={{
                    p: 2,
                    flexDirection: isMobile ? "column" : "row",
                    gap: 1.5,
                    justifyContent: isMobile ? "stretch" : "space-between",
                  }}
                >
                  <TextField
                    select
                    label="Estado"
                    size="small"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    fullWidth={isMobile}
                    sx={{ minWidth: { xs: "100%", sm: 150 } }}
                  >
                    <MenuItem value="PENDING">Pendiente</MenuItem>
                    <MenuItem value="PROCESSING">En proceso</MenuItem>
                    <MenuItem value="COMPLETED">Completado</MenuItem>
                    <MenuItem value="CANCELLED">Cancelado</MenuItem>
                  </TextField>

                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    fullWidth={isMobile}
                    onClick={() => handleStatusChange(order.id, order.status)}
                    sx={{
                      fontWeight: 600,
                      mt: isMobile ? 1 : 0,
                    }}
                  >
                    Actualizar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
