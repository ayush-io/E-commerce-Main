import React, { useState } from "react";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import "./products.Module.css";
import ProductCard from "./ProductCard";

const AllProducts = ({ products, onAddToCart }) => {
  // Pagination state
  const [page, setPage] = useState(1);
  const productsPerPage = 18;

  // Calculate the current products to display
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ margin: "50px 0px", position: "relative" }}>
      <div className="slider-container products-slider">
        <Typography sx={{ textAlign: "left", mx: "20px", fontSize: "1.5rem" }}>
          All Products
        </Typography>
        <Grid container sx={{ flexGrow: 1, px: 2 }} spacing={2}>
          {displayedProducts.map((product, id) => (
            <Grid item xs={2} key={id}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      </div>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default AllProducts;
