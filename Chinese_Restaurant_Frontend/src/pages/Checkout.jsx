import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import API from "../api/Api.jsx";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Grid,
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = ["Shipping Address", "Order Review", "Payment"];


// ADDRESS FORM (Moved Outside)


const AddressForm = ({ address, errors, handleInputChange }) => (
  <Card elevation={4} sx={{ p: 4, borderRadius: 4 }}>
    <Typography variant="h6" fontWeight={700} mb={4}>
      Shipping Details
    </Typography>

    <Grid container spacing={3}>
      {Object.keys(address).map((field) => (
        <Grid item xs={12} md={6} key={field}>
          <TextField
            fullWidth
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            value={address[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            error={!!errors[field]}
            helperText={errors[field]}
            autoComplete="off"
          />
        </Grid>
      ))}
    </Grid>
  </Card>
);


// ORDER REVIEW


const OrderReview = ({ cartItems, totalPrice }) => (
  <Card elevation={4} sx={{ p: 3, borderRadius: 4 }}>
    <Typography variant="h6" fontWeight={700} mb={3}>
      Order Items
    </Typography>

    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell align="center">Qty</TableCell>
          <TableCell align="center">Price</TableCell>
          <TableCell align="center">Total</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {cartItems.map((item) => (
          <TableRow key={item._id}>
            <TableCell>{item.name}</TableCell>
            <TableCell align="center">{item.qty}</TableCell>
            <TableCell align="center">₹ {item.price}</TableCell>
            <TableCell align="center">
              ₹ {item.price * item.qty}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <Box textAlign="right" mt={3}>
      <Typography variant="h6">Total: ₹ {totalPrice}</Typography>
    </Box>
  </Card>
);


// PAYMENT


const Payment = ({ totalPrice }) => (
  <Card elevation={4} sx={{ p: 6, textAlign: "center", borderRadius: 4 }}>
    <CircularProgress size={80} thickness={4} />

    <Typography variant="h4" fontWeight={800} mt={2}>
      Order is Processing. Complete Order
    </Typography>

    <Typography mt={2}>
      Grand Order Total: <b>₹ {totalPrice}</b>
    </Typography>
  </Card>
);


// MAIN CHECKOUT


const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, totalPrice, setCartItems } = useCart();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState({
  open: false,
  orderId: "",
  transactionId: "",
});

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    upiId: "",
  });

  const [errors, setErrors] = useState({});

 

  const handleInputChange = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };



  const validateShipping = () => {
    const newErrors = {};

    Object.entries(address).forEach(([key, val]) => {
      if (!val.trim()) newErrors[key] = "Required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleNext = () => {
    if (activeStep === 0 && !validateShipping()) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  

  const handleCompleteOrder = async () => {
    if (!user) {
      alert("Login required");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        shippingAddress: address,
        items: cartItems,
        total: totalPrice,
      };

      const order = await API.post("/order", orderData);

      await API.post("/payment", {
        orderId: order.data._id,
        amount: totalPrice,
      });

      //Simulate payment 
      const paymentResponse = await API.post("/payment", { orderId: order.data._id, amount: totalPrice });

      setCartItems([]);
      setSuccessDialog({
  open: true,
  orderId: order.data._id.slice(-6).toUpperCase(),
  transactionId: paymentResponse.data.transactionId,
});

    } catch (err) {
      alert(err.response?.data?.message || "Order Failed");
    } finally {
      setLoading(false);
    }
  };


  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <AddressForm
            address={address}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        );
      case 1:
        return (
          <OrderReview
            cartItems={cartItems}
            totalPrice={totalPrice}
          />
        );
      case 2:
        return <Payment totalPrice={totalPrice} />;
      default:
        return null;
    }
  };

 

  return (
    <Box sx={{ minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">

        <Typography
                    variant="h3"
                    component="h1"
                    fontWeight={800}
                    sx={{ color: "#2c3e50", mb: 2 }}
                    align="center"
                    paddingBottom={5}
                  >
                    Check Out
                  </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStep()}

        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
          {activeStep !== 0 && (
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
          )}

          {activeStep < steps.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}

          {activeStep === steps.length - 1 && (
            <Button
              variant="contained"
              onClick={handleCompleteOrder}
              disabled={loading}
            >
              {loading ? "Processing..." : "Complete Order"}
            </Button>
          )}
        </Box>
      </Container>
      <Dialog
  open={successDialog.open}
  onClose={() => setSuccessDialog({ ...successDialog, open: false })}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle textAlign="center">
    <CheckCircleIcon
      sx={{ fontSize: 70, color: "green", mb: 1 }}
    />
    <Typography variant="h5" fontWeight={700}>
      Order Successful
    </Typography>
  </DialogTitle>

  <DialogContent>
    <Typography textAlign="center" mb={1}>
      Your order has been placed successfully 🎉
    </Typography>

    <Typography textAlign="center">
      <b>Order ID:</b> {successDialog.orderId}
    </Typography>

    <Typography textAlign="center">
      <b>Transaction ID:</b> {successDialog.transactionId}
    </Typography>
  </DialogContent>

  <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
    <Button
      variant="contained"
      size="large"
      onClick={() => {
        setSuccessDialog({ ...successDialog, open: false });
        navigate("/orders");
      }}
    >
      View Orders
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default Checkout; 