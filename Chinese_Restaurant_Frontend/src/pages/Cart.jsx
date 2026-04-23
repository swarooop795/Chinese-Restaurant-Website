import React from "react";
import { useCart } from "../context/CartContext";
import {
  Container,
  Typography,
  Card,
  Button,
  TextField,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const { cartItems, removeItem, updateQty, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <Box sx={{ background: "linear-gradient(135deg, #f8f7f3 0%, #e8e6e3 100%)", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight={800}
            sx={{ color: "#2c3e50", mb: 2 }}
          >
            Your Shopping Cart
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#666", fontSize: "1.1rem" }}
          >
            Review your items before checkout
          </Typography>
        </Box>

        {cartItems.length === 0 ? (
          <Card
            elevation={4}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              backgroundColor: "#fff",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ color: "#666", mb: 3 }}>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/menu")}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Continue Shopping
            </Button>
          </Card>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items Table */}
            <Grid item xs={12} lg={8}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  backgroundColor: "#fff",
                }}
              >
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{
                          backgroundColor: "#2c3e50",
                          "& th": {
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            padding: "20px",
                          },
                        }}
                      >
                        <TableCell>Product</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow
                          key={item._id}
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(0,0,0,0.02)",
                            },
                            borderBottom: "1px solid #e0e0e0",
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                              />
                              <Box>
                                <Typography fontWeight={700} sx={{ color: "#2c3e50" }}>
                                  {item.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#999" }}>
                                  {item.category}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Typography fontWeight={600} sx={{ color: "#2c3e50" }}>
                              ₹ {item.price}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <TextField
                              type="number"
                              value={item.qty}
                              onChange={(e) =>
                                updateQty(item._id, Number(e.target.value))
                              }
                              size="small"
                              inputProps={{ min: 1, style: { textAlign: "center" } }}
                              sx={{
                                width: "80px",
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Typography fontWeight={700} sx={{ color: "#e74c3c", fontSize: "1.1rem" }}>
                              ₹ {item.price * item.qty}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              startIcon={<DeleteIcon />}
                              onClick={() => removeItem(item._id)}
                              sx={{
                                borderRadius: 2,
                                fontWeight: 600,
                                "&:hover": {
                                  backgroundColor: "rgba(244, 67, 54, 0.1)",
                                },
                              }}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} lg={4}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  p: 4,
                  position: "sticky",
                  top: 20,
                }}
              >
                <Typography variant="h6" fontWeight={800} sx={{ color: "#2c3e50", mb: 3 }}>
                  Order Summary
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    pb: 2,
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <Typography sx={{ color: "#666" }}>Subtotal:</Typography>
                  <Typography fontWeight={600} sx={{ color: "#2c3e50" }}>
                    ₹ {totalPrice}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    pb: 2,
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <Typography sx={{ color: "#666" }}>Delivery Charges:</Typography>
                  <Typography fontWeight={600} sx={{ color: "#2c3e50" }}>
                    ₹ 0
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 4,
                    p: 2,
                    backgroundColor: "rgba(231, 76, 60, 0.1)",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight={800} sx={{ color: "#2c3e50" }}>
                    Total Amount:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={800}
                    sx={{ color: "#e74c3c", fontSize: "1.3rem" }}
                  >
                    ₹ {totalPrice}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => navigate("/checkout")}
                  sx={{
                    borderRadius: 3,
                    py: 2,
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    mb: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate("/menu")}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Continue Shopping
                </Button>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Cart;