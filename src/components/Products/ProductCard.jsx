import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./products.Module.css";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={product.images[0]}
          alt={product.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2, // Limits the title to 2 lines
              height: "2rem", // Adjust based on the font size and number of lines
            }}
          >
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
