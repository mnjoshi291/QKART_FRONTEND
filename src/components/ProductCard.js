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

const ProductCard = ({product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt="Video"
      />
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {product.name}
        </Typography>

        <Typography gutterBottom variant="h5">
          ${product.cost}
        </Typography>
        
        <Typography gutterBottom>
        <Rating value={product.rating} readOnly />
        </Typography>
        
      </CardContent>
      <CardActions>
      <Button className="card-button" variant="contained" fullWidth onClick={handleAddToCart}>
        ADD TO CART</Button>
      </CardActions>
     </Card>
  );
};

export default ProductCard;
