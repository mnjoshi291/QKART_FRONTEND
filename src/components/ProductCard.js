import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
    return (
      <Card variant="outlined" className="card">
        <CardMedia component="img" image={product.image} alt={product.name} />
        <CardContent>
          <Typography variant="h5" component="h5">
            {product.name}
          </Typography>
          <Typography variant="h5" component="h5">
            ${product.cost}
          </Typography>
          <Rating name="read-only" value={product.rating} readOnly />
        </CardContent>
        <CardActions className="card-actions">
          <Button className="card-button" variant="contained" startIcon={<AddShoppingCartOutlined/>} >ADD TO CART</Button>
        </CardActions>
      </Card>
    );
};

export default ProductCard;
