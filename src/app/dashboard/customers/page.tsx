"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { Add, Person, Business, Email, Phone } from "@mui/icons-material";
import { useCustomersStore } from "@/modules/customers/stores/customersStore";
import { Customer } from "@/types";

export default function CustomersPage() {
  const router = useRouter();
  const { customers, activeCustomer, fetchCustomers, setActiveCustomer, addCustomer, loading } =
    useCustomersStore();

  const [openDialog, setOpenDialog] = useState(false);
  const [newCustomer, setNewcustomer] = useState<Customer>({
    customer_type: "individual",
    first_name: "",
    last_name: "",
    company_name: "",
    identification_type: "CC",
    identification_number: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCreateCustomer = async () => {
    try {
      await addCustomer(newCustomer);
      setOpenDialog(false);
      setNewcustomer({
        customer_type: "individual",
        first_name: "",
        last_name: "",
        company_name: "",
        identification_type: "CC",
        identification_number: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight={600}>
          Clientes
        </Typography>

        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
        >
          Nuevo cliente
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Listado */}
      {loading ? (
        <Typography>Cargando clientes...</Typography>
      ) : customers.length === 0 ? (
        <Typography color="text.secondary">
          No hay clientes registrados.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {customers.map((customer) => (
            <Grid key={customer.id} size={{ xs: 12, sm: 6, md: 4 }} component={'div'}>
              <Card
                onClick={() => setActiveCustomer(customer)}
                sx={{
                  cursor: "pointer",
                  border:
                    activeCustomer?.id === customer.id
                      ? "2px solid #1976d2"
                      : "1px solid #e0e0e0",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Person color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      {customer.first_name} {customer.last_name}
                    </Typography>
                  </Box>

                  {customer.company_name && (
                    <Box display="flex" alignItems="center" mb={0.5}>
                      <Business sx={{ mr: 1 }} fontSize="small" color="action" />
                      <Typography variant="body2">
                        {customer.company_name}
                      </Typography>
                    </Box>
                  )}

                  {customer.email && (
                    <Box display="flex" alignItems="center" mb={0.5}>
                      <Email sx={{ mr: 1 }} fontSize="small" color="action" />
                      <Typography variant="body2">{customer.email}</Typography>
                    </Box>
                  )}

                  {customer.phone && (
                    <Box display="flex" alignItems="center">
                      <Phone sx={{ mr: 1 }} fontSize="small" color="action" />
                      <Typography variant="body2">{customer.phone}</Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog Crear Cliente */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle fontWeight={600}>Registrar nuevo cliente</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }} component={'div'} >
              <TextField
                label="Nombre"
                value={newCustomer.first_name}
                onChange={(e) =>
                  setNewcustomer({ ...newCustomer, first_name: e.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }} component={'div'}>
              <TextField
                label="Apellido"
                value={newCustomer.last_name}
                onChange={(e) =>
                  setNewcustomer({ ...newCustomer, last_name: e.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }} component={'div'}>
              <TextField
                label="Email"
                type="email"
                value={newCustomer.email}
                onChange={(e) =>
                  setNewcustomer({ ...newCustomer, email: e.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }} component={'div'}>
              <TextField
                label="Teléfono"
                value={newCustomer.phone}
                onChange={(e) =>
                  setNewcustomer({ ...newCustomer, phone: e.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }} component={'div'}>
              <TextField
                label="Número de identificación"
                value={newCustomer.identification_number}
                onChange={(e) =>
                  setNewcustomer({
                    ...newCustomer,
                    identification_number: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleCreateCustomer}>
            Crear cliente
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
