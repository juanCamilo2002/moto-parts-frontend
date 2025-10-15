'use client';
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Product } from "@/types";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={product.image || "https://placehold.co/600x400"}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography color="text.secondary">
          {product.brand.name} - {product.category.name}
        </Typography>
        <Typography variant="body1">${product.price}</Typography>
      </CardContent>
    </Card>
  );
};
