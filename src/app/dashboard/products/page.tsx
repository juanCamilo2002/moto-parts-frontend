"use client";

import { Fragment, useEffect, useState } from "react";
import { useProductsStore } from "@/modules/products/store/productsStore";

import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";

export default function ProductsPage() {
  const { products, fetchProducts, loading } = useProductsStore();
  const [search, setSearch] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (filterBrand ? p.brand.name === filterBrand : true))
    .filter((p) => (filterCategory ? p.category.name === filterCategory : true));

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Productos
      </Typography>

      {/* Filtros y búsqueda */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          label="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          label="Marca"
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="Honda">Honda</MenuItem>
          <MenuItem value="Yamaha">Yamaha</MenuItem>
          <MenuItem value="Suzuki">Suzuki</MenuItem>
          <MenuItem value="Kawasaki">Kawasaki</MenuItem>
        </TextField>
        <TextField
          select
          label="Categoría"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <MenuItem value="" >Todas</MenuItem>
          <MenuItem value="Motor">Motor</MenuItem>
          <MenuItem value="Frenos">Frenos</MenuItem>
          <MenuItem value="Suspensión">Suspensión</MenuItem>
          <MenuItem value="Eléctrico">Eléctrico</MenuItem>
          <MenuItem value="Transmisión">Transmisión</MenuItem>
        </TextField>
      </div>

      {/* Lista de productos */}
      {loading ? (
        <Typography>Cargando...</Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}  component={'div'}>
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
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
