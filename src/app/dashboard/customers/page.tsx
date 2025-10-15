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
} from "@mui/material";
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

  const handleCreatecustomer = async () => {
    try {
      addCustomer(newCustomer);
      setOpenDialog(false);
      setNewcustomer({
        customer_type: "",
        first_name: "",
        last_name: "",
        company_name: "",
        identification_type: "",
        identification_number: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

 
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        clientes
      </Typography>

      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Crear cliente
      </Button>

      {loading ? (
        <Typography>Cargando...</Typography>
      ) : (
        <Grid container spacing={2} style={{ marginTop: "1rem" }}>
          {customers.map((customer) => (
            <Grid key={customer.id} size={{ xs: 12, sm: 6, md: 4 }}  component={'div'}>
              <Card
                variant={activeCustomer?.id === customer.id ? "outlined" : "elevation"}
                style={{
                  border: activeCustomer?.id === customer.id ? "2px solid blue" : undefined,
                  cursor: "pointer",
                }}
                onClick={() => setActiveCustomer(customer)}
              >
                <CardContent>
                  <Typography variant="h6">{customer.first_name}</Typography>
                  {customer.last_name && <Typography>{customer.last_name}</Typography>}
                  {customer.email && <Typography>{customer.email}</Typography>}
                  {customer.phone && <Typography>{customer.phone}</Typography>}

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog para crear cliente */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Crear cliente</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            label="Nombre"
            value={newCustomer.first_name}
            onChange={(e) => setNewcustomer({ ...newCustomer, first_name: e.target.value })}
          />
          <TextField
            label="Apellido"
            value={newCustomer.last_name}
            onChange={(e) => setNewcustomer({ ...newCustomer, last_name: e.target.value })}
          />
          <TextField
            label="Email"
            value={newCustomer.email}
            onChange={(e) => setNewcustomer({ ...newCustomer, email: e.target.value })}
          />
          <TextField
            label="Teléfono"
            value={newCustomer.phone}
            onChange={(e) => setNewcustomer({ ...newCustomer, phone: e.target.value })}
          />
          <TextField
            label="Número de identificación"
            value={newCustomer.identification_number}
            onChange={(e) => setNewcustomer({ ...newCustomer, identification_number: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleCreatecustomer}>
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
