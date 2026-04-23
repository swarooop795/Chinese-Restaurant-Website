import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/Api.jsx";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Box,
} from "@mui/material";

const steps = [
  "Order Placed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setError("Please login to view orders");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await API.get("/orders/user");
        // Transform backend data
        const transformedOrders = response.data.map(order => ({
          id: order._id.slice(-6).toUpperCase(),
          date: new Date(order.createdAt).toLocaleDateString('en-IN'),
          items: order.items.map(item => item.name).join(', '),
          total: order.total,
          status: getStatusIndex(order.status)
        }));
        setOrders(transformedOrders);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (step) => {
    switch (step) {
      case 0:
        return "info";
      case 1:
        return "warning";
      case 2:
        return "secondary";
      case 3:
        return "success";
      default:
        return "default";
    }
  };

  const getStatusIndex = (status) => {
    const statusMap = {
      "Pending": 0,
      "Preparing": 1,
      "Out for Delivery": 2,
      "Delivered": 3
    };
    return statusMap[status] || 0;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(120deg,#f5f4f4 0%, #f5f4f4 100%)",
        py: 8,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">

        {/* PAGE TITLE */}
        <Typography
          variant="h3"
          component="h1"
          align="center"
          fontWeight={800}
          sx={{
            mb: 5,
            letterSpacing: 1,
            color: "#2c3e50",
          }}
        >
          My Orders
        </Typography>

        {/* ================= TABLE ================= */}
        <TableContainer
          component={Paper}
          elevation={6}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Table>

            {/* TABLE HEADER */}
            <TableHead
              sx={{
                backgroundColor: "#111",
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Order ID
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Items
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Total (₹)
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>

            {/* TABLE BODY */}
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography>Loading orders...</Typography>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, color: "error.main" }}>
                    <Typography>{error}</Typography>
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Typography>No orders found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    hover
                    sx={{
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>
                      {order.id}
                    </TableCell>

                    <TableCell>{order.date}</TableCell>

                    <TableCell>{order.items}</TableCell>

                    <TableCell sx={{ fontWeight: "bold" }}>
                      ₹ {order.total}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={steps[order.status]}
                        color={getStatusColor(order.status)}
                        sx={{
                          fontWeight: "bold",
                          borderRadius: 2,
                          px: 1,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>

          </Table>
        </TableContainer>
        

        <Typography
          variant="h4"
          component="h1"
          align="center"
          fontWeight={800}
          paddingTop={7}
          sx={{
            mb: 5,
            letterSpacing: 1,
            color: "#2c3e50",
          }}
        >
          Order Tracking History
        </Typography>

        {/* ================= TRACKING SECTION ================= */}
        <Box sx={{ mt: 6 }}>
          {loading || error ? null : orders.map((order) => (
            <Paper
              key={order.id}
              elevation={5}
              sx={{
                mb: 4,
                p: 4,
                borderRadius: 4,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 3, color: "#34495e" }}
              >
                🚚 Tracking — {order.id}
              </Typography>

              <Stepper activeStep={order.status} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        "& .MuiStepLabel-label": {
                          fontWeight: 500,
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

            </Paper>
          ))}
        </Box>

      </Container>
    </Box>
  );
};

export default Orders;