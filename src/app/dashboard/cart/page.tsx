"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/modules/cart/stores/cartStore";
import { useProductsStore } from "@/modules/products/store/productsStore";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCustomersStore } from "@/modules/customers/stores/customersStore";

export default function CartPage() {
  const { cart, fetchCart, addProduct, checkout, addItemToCart } = useCartStore();
  const {fetchCustomers, customers} = useCustomersStore();
  const { products, fetchProducts } = useProductsStore();

  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);


  useEffect(() => {
    if (selectedCustomer) fetchCart(selectedCustomer);
  }, [selectedCustomer]);

  const handleAddProduct = () => {
    if (!selectedCustomer || !selectedProduct) return;
    addProduct(selectedCustomer, selectedProduct, quantity);
    setQuantity(1);
    setSelectedProduct(null);
  };

  const handleQuantityChange = (itemId: number, newQty: number) => {
    if (!cart) return;
    addItemToCart(cart.id, itemId, newQty);
  };

  const handleRemoveItem = (itemId: number) => {
    if (!cart) return;
    addItemToCart(cart.id, itemId, 0); 
  };

  const total = cart
    ? cart.items_detail.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    : 0;

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Carrito del cliente
      </Typography>

      {/* Selección de Cliente */}
      <TextField
        select
        label="Seleccionar Cliente"
        value={selectedCustomer || ""}
        onChange={(e) => setSelectedCustomer(Number(e.target.value))}
        sx={{ mb: 3, minWidth: 250 }}
      >
        {customers.map((customer) => (
           <MenuItem value={customer.id}>{customer.first_name}</MenuItem>
        ))}
       
      </TextField>

      {/* Agregar Producto */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <TextField
          select
          label="Producto"
          value={selectedProduct || ""}
          onChange={(e) => setSelectedProduct(Number(e.target.value))}
          sx={{ minWidth: 300 }}
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
          onChange={(e) => setQuantity(Number(e.target.value))}
          sx={{ width: 100 }}
        />
        <Button variant="contained" onClick={handleAddProduct}>
          Agregar
        </Button>
      </div>

      {/* Lista de productos en carrito */}
      {cart && cart.items_detail.length > 0 ? (
        <Grid container spacing={2}>
          {cart.items_detail.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}  component={'div'}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{item.product.name}</Typography>
                  <Typography>Precio: ${item.product.price}</Typography>
                  <TextField
                    type="number"
                    label="Cantidad"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.product.id, Number(e.target.value))
                    }
                    sx={{ mt: 1, mb: 1, width: 100 }}
                  />
                  <Typography>
                    Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No hay productos en el carrito.</Typography>
      )}

      {/* Total y Checkout */}
      {cart && cart.items_detail.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => cart && checkout(cart.id)}
              sx={{ mt: 2 }}
            >
              Finalizar pedido
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
