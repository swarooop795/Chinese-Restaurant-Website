import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function FoodCard({ food }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        backgroundColor: "#fff",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={food.image}
        alt={food.name}
        sx={{
          objectFit: "cover",
          filter: "brightness(0.95)",
          transition: "filter 0.3s ease",
          "&:hover": { filter: "brightness(1.05)" },
        }}
      />

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          sx={{ color: "#2c3e50" }}
        >
          {food.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "#666", mb: 1 }}
        >
          {food.category}
        </Typography>

        <Typography
          variant="h6"
          fontWeight={800}
          sx={{ color: "#e74c3c", mb: 2 }}
        >
          ₹ {food.price}
        </Typography>

        <Box sx={{ mt: "auto" }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1rem",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
