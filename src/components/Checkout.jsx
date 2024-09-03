import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

function Checkout({ cart }) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (cart.length === 0) {
    return (
      <Typography
        variant="h4"
        textAlign={"center"}
        fontWeight={700}
        sx={{ margin: 8 }}
      >
        Your Cart is Empty
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f3f3f3",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          maxWidth: "800px",
          width: "100%",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
        elevation={3}
      >
        <Typography variant="h4" fontWeight={700} marginBottom={4}>
          Checkout
        </Typography>

        {orderPlaced && (
          <Alert severity="success" sx={{ marginBottom: 4 }}>
            Your order has been placed successfully!
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" variant="outlined" required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              multiline
              rows={3}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="City" variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Postal Code"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Country" variant="outlined" required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Credit Card Number"
              variant="outlined"
              required
              inputProps={{ maxLength: 16 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Expiration Date (MM/YY)"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CVV"
              variant="outlined"
              required
              inputProps={{ maxLength: 3 }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ margin: "20px 0" }} />

        <Typography variant="h5" fontWeight={700} marginBottom={2}>
          Total: ${totalAmount.toFixed(2)}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ padding: "15px", fontSize: "1rem", fontWeight: 700 }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Paper>
    </Box>
  );
}

export default Checkout;
