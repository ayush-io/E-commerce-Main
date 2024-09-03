import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

function Cart({ cart, onRemoveItem, onUpdateQuantity, setOpen }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    setOpen(false);
    navigate("/checkout");
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const items = cart;

  if (items.length === 0) {
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
    <>
      <Box
        sx={{
          backgroundColor: "#f3f3f3",
          width: "100%",
          height: "100%",
          padding: "20px 40px",
        }}
      >
        <Typography
          variant="h4"
          textAlign={"center"}
          fontWeight={700}
          marginBottom={3}
        >
          Your Cart:
        </Typography>
        {items.map((item, index) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.title}
            price={item.price}
            initialQuantity={item.quantity}
            image={item.images[0]}
            onRemove={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
        <Divider />
        <Typography variant="h5" fontWeight={700} margin={"5px 0"}>
          Total: ${getTotalPrice().toFixed(2)}
        </Typography>
        <Divider />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          sx={{ margin: "15px 0" }}
        >
          Checkout
        </Button>
      </Box>
    </>
  );
}

export default Cart;
