import { Button, Typography, Card, CardContent } from "@mui/material";
import { useCartStore } from "../stores/cartStore";

export const CartSummary = () => {
  const { cart, checkout } = useCartStore();

  if (!cart) return null;

  const total = cart.items_detail.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <Card className="mt-4">
      <CardContent>
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => checkout(cart.id)}
          sx={{ mt: 2 }}
        >
          Finalizar pedido
        </Button>
      </CardContent>
    </Card>
  );
};
