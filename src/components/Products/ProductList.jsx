import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "./products.Module.css";
import ProductCard from "./ProductCard";

const PrevArrow = (props) => {
  const { className, onClick, currentSlide } = props;
  return (
    <>
      {currentSlide !== 0 && (
        <div className={className} onClick={onClick} style={{ opacity: "40%" }}>
          <ArrowBackIos style={{ color: "blue", fontSize: "20px" }} />
        </div>
      )}
    </>
  );
};

let slidesToShow = 5;

const NextArrow = (props) => {
  const { className, onClick, currentSlide, slideCount } = props;
  return (
    <>
      {currentSlide !== slideCount - slidesToShow && (
        <div className={className} onClick={onClick} style={{ opacity: "40%" }}>
          <ArrowForwardIos style={{ color: "blue", fontSize: "20px" }} />
        </div>
      )}
    </>
  );
};

const ProductList = ({ products, selectedMenu, onAddToCart }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 824,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slider = useRef(null);

  return (
    <Box sx={{ margin: "50px 0px", position: "relative" }}>
      <div className="slider-container products-slider">
        <Typography sx={{ textAlign: "left", mx: "20px", fontSize: "1.5rem" }}>
          Category: {selectedMenu}
        </Typography>
        <Slider ref={slider} {...settings}>
          {products.map((product, id) => (
            <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Slider>
      </div>
    </Box>
  );
};

export default ProductList;
