import { CartItem } from "@/types";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { useCartStore } from "../stores/cartStore";
import { Add, Delete, Remove } from "@mui/icons-material";


interface Props {
  item: CartItem;
}

export const CartItemCard = ({ item }: Props) => {
  const { addItemToCart, cart } = useCartStore();

  const handleUpdateQuantity = (newQuantity: number) => {
    if (!cart) return;
    addItemToCart(cart.id, item.product.id, newQuantity);
  }
  return (
    <Card variant="outlined" className="mb-3">
      <CardContent>
        <Typography variant="h6">{item.product.name}</Typography>
        <Typography>Precio: ${item.product.price}</Typography>

        <div className="flex items-center gap-2 mt-2">
          <IconButton onClick={() => handleUpdateQuantity(item.quantity - 1)}>
            <Remove />
          </IconButton>
          <Typography>{item.quantity}</Typography>
          <IconButton onClick={() => handleUpdateQuantity(item.quantity + 1)}>
            <Add />
          </IconButton>
          <IconButton color="error" onClick={() => handleUpdateQuantity(0)}>
            <Delete/>
          </IconButton>
        </div>

        <Typography className="mt-2">
          Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};
