"use client";

import { useEffect } from "react";
import { useOrderStore } from "@/modules/orders/stores/ordersStore";
import { Typography, Card, CardContent, Button, Grid, MenuItem, TextField } from "@mui/material";

export default function OrdersPage() {
  const { orders, fetchOrders, updateStatus, loading } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId: number, newStatus: string) => {
    updateStatus(orderId, newStatus);
  };

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Pedidos
      </Typography>

      {loading ? (
        <Typography>Cargando pedidos...</Typography>
      ) : orders.length === 0 ? (
        <Typography>No hay pedidos.</Typography>
      ) : (
        <Grid container spacing={2}>
          {orders.map((order) => (
            <Grid key={order.id} size={{ xs: 12, sm: 6, md: 4 }}  component={'div'} >
              <Card>
                <CardContent>
                  <Typography variant="h6">Pedido #{order.id}</Typography>
                  <Typography>Cliente: {order.customer.first_name}</Typography>
                  <Typography>Total: ${order.total}</Typography>
                  <TextField
                    select
                    label="Estado"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    sx={{ mt: 1, mb: 1 }}
                  >
                    <MenuItem value="PENDING">Pendiente</MenuItem>
                    <MenuItem value="PROCESSING">En proceso</MenuItem>
                    <MenuItem value="COMPLETED">Completado</MenuItem>
                    <MenuItem value="CANCELLED">Cancelado</MenuItem>
                  </TextField>

                  <Typography variant="subtitle2">Productos:</Typography>
                  {order.items_detail.map((item) => (
                    <Typography key={item.id}>
                      {item.product.name} x {item.quantity} = ${item.price * item.quantity}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
