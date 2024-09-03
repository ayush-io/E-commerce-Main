import {
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const CartItem = ({
  id,
  name,
  price,
  initialQuantity,
  image,
  onRemove,
  onUpdateQuantity,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleRemove = () => {
    onRemove(id);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      onUpdateQuantity(id, newQuantity);
      return newQuantity;
    });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        onUpdateQuantity(id, newQuantity);
        return newQuantity;
      });
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      onUpdateQuantity(id, value);
    }
  };

  const totalPrice = price * quantity;

  return (
    <>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <CardMedia
            component="img"
            sx={{ width: 120, height: 120, alignSelf: "flex-start" }}
            image={image}
            alt={name}
          />
          <CardContent
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyItems: "flex-start",
              padding: "0 30px",
            }}
          >
            <Typography component="div" variant="h6" marginBottom={4}>
              {name}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              Price: ${price.toFixed(2)}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Total: ${totalPrice.toFixed(2)}
            </Typography>
          </CardContent>
        </Box>
        <Grid container spacing={3} sx={{ mt: 1, alignItems: "center" }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDecreaseQuantity}
              disabled={quantity > 1 ? false : true}
            >
              -
            </Button>
          </Grid>
          <Grid item>
            <TextField
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }}
              variant="standard"
              sx={{ width: 50, textAlign: "center", border: "none" }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleIncreaseQuantity}
            >
              +
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default CartItem;
