"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/modules/cart/stores/cartStore";
import { useProductsStore } from "@/modules/products/store/productsStore";
import { useCustomersStore } from "@/modules/customers/stores/customersStore";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  IconButton,
  Box,
  Divider,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";


export default function CartPage() {
  const { cart, fetchCart, addProduct, checkout, addItemToCart } = useCartStore();
  const { fetchCustomers, customers } = useCustomersStore();
  const { products, fetchProducts } = useProductsStore();

  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, [fetchCustomers, fetchProducts]);

  useEffect(() => {
    if (selectedCustomer) fetchCart(selectedCustomer);
  }, [selectedCustomer, fetchCart]);

  const handleAddProduct = () => {
    if (!selectedCustomer || !selectedProduct) return;
    addProduct(selectedCustomer, selectedProduct, quantity);
    setQuantity(1);
    setSelectedProduct(null);
  };

  const handleQuantityChange = (productId: number, newQty: number) => {
    if (!cart) return;
    addItemToCart(cart.id, productId, newQty);
  };

  const handleRemoveItem = (productId: number) => {
    if (!cart) return;
    addItemToCart(cart.id, productId, 0);
  };

  const total = cart
    ? cart.items_detail.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    : 0;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pb: { xs: 10, md: 4 } }}>
      {/* Header */}
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <ShoppingCartIcon color="primary" fontSize="large" />
        <Typography variant="h4" fontWeight={600} fontSize={{ xs: 24, sm: 32 }}>
          Carrito de compra
        </Typography>
      </Box>

      {/* Cliente */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          alignItems={isMobile ? "stretch" : "center"}
        >
          <PersonIcon color="action" />
          <TextField
            select
            label="Seleccionar cliente"
            value={selectedCustomer || ""}
            onChange={(e) => setSelectedCustomer(Number(e.target.value))}
            fullWidth
          >
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.first_name} {customer.last_name || ""}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      {/* Agregar producto */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Agregar producto
        </Typography>

        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          alignItems={isMobile ? "stretch" : "center"}
          flexWrap="wrap"
        >
          <TextField
            select
            label="Producto"
            value={selectedProduct || ""}
            onChange={(e) => setSelectedProduct(Number(e.target.value))}
            fullWidth={isMobile}
            sx={{ minWidth: { xs: "100%", sm: 250 } }}
          >
            {products.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name} - ${p.price}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="number"
            label="Cantidad"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            sx={{ width: isMobile ? "100%" : 120 }}
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddProduct}
            sx={{ width: isMobile ? "100%" : "auto" }}
          >
            Agregar
          </Button>
        </Stack>
      </Paper>

      {/* Carrito */}
      {cart && cart.items_detail.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {cart.items_detail.map((item) => (
              <Grid key={item.id} size={{xs: 12, sm: 6, md: 4}} component={'div'}>
                <Card
                  variant="outlined"
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "0.2s",
                    "&:hover": { boxShadow: 4, transform: "translateY(-2px)" },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {item.product.name}
                    </Typography>
                    <Typography color="text.secondary" fontSize="0.9rem">
                      Precio unitario: ${item.product.price}
                    </Typography>

                    <TextField
                      type="number"
                      label="Cantidad"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.product.id,
                          Math.max(0, Number(e.target.value))
                        )
                      }
                      sx={{ mt: 2, mb: 1, width: 100 }}
                    />

                    <Typography fontWeight={500}>
                      Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                    </Typography>

                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(item.product.id)}
                      sx={{ mt: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Total */}
          <Card
            sx={{
              mt: 4,
              p: 2,
              position: { xs: "fixed", md: "static" },
              bottom: { xs: 0, md: "auto" },
              left: 0,
              right: 0,
              borderRadius: { xs: 0, md: 2 },
              boxShadow: { xs: 3, md: "none" },
              backgroundColor: { xs: "background.paper", md: "inherit" },
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h5" fontWeight={700}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Button
                fullWidth
                variant="contained"
                color="success"
                size="large"
                onClick={() => cart && checkout(cart.id)}
              >
                Finalizar pedido
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <Typography color="text.secondary" mt={3} textAlign="center">
          No hay productos en el carrito.
        </Typography>
      )}
    </Box>
  );
}
