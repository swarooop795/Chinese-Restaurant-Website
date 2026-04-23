import React, { useState } from "react";
import API from "../api/Api.jsx";
import {
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Reservation = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [people, setPeople] = useState("1");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time || !name || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      const reservationData = {
        name,
        phone,
        date: dayjs(date).format("YYYY-MM-DD"),
        time: dayjs(time).format("HH:mm"),
        people: parseInt(people)
      };

      await API.post("/reservation", reservationData);
      
      setOpenDialog(true);
    } catch (error) {
      if (error.response?.status === 409) {
        setErrorMessage(error.response.data.message);
        setErrorDialog(true);
        return;
      }
      alert("Reservation failed: " + (error.response?.data?.message || error.message));
    }
  };

  const handleClose = () => setOpenDialog(false);

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
          
      <Container maxWidth="md">
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
                  Table Reservation
                </Typography>
        {/* Reservation Card */}
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 5,
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.99)",
            boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
            transition: "0.4s",
            "&:hover": {
              transform: "translateY(-6px)",
            },
          }}
        >
          

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Name */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Customer Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                {/* Phone */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                {/* Date */}
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Reservation Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
                {/* Time */}
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Reservation Time"
                    value={time}
                    onChange={(newValue) => setTime(newValue)}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
                
                {/* People */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="people-label">Number of People</InputLabel>

                    <Select
                      labelId="people-label"
                      value={people}
                      label="Number of People"
                      onChange={(e) => setPeople(e.target.value)}
                      sx={{
                        height: 56,
                      }}
                    >
                      <MenuItem value="">
                        <em>Select People</em>
                      </MenuItem>

                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <MenuItem key={num} value={num}>
                          Reservation for {num} People
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* Alignment Spacer */}
                <Grid item xs={12} md={6}></Grid>
                {/* Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      py: 1.5,
                      borderRadius: 3,
                      textTransform: "none",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    CONFIRM RESERVATION{" "}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </LocalizationProvider>
        </Paper>

        {/* Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: 4,
              p: 2,
              textAlign: "center",
            },
          }}
        >
          <DialogTitle
            sx={{ fontWeight: "bold", fontSize: "24px", color: "#e53935" }}
          >
            🎉 Reservation Confirmed
          </DialogTitle>

          <DialogContent>
            <Typography sx={{ mb: 1 }}>
              Thank you <strong>{name}</strong>!
            </Typography>

            <Typography>
              📅 {date ? dayjs(date).format("DD MMM YYYY") : ""}
            </Typography>

            <Typography>
              ⏰ {time ? dayjs(time).format("hh:mm A") : ""}
            </Typography>

            <Typography>👨‍👩‍👧 Guests: {people}</Typography>
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                borderRadius: 3,
                px: 4,
                background: "#e53935",
                fontWeight: "bold",
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* Error Dialog */}
        <Dialog
          open={errorDialog}
          onClose={() => setErrorDialog(false)}
          PaperProps={{
            sx: {
              borderRadius: 4,
              p: 2,
              textAlign: "center",
            },
          }}
        >
          <DialogTitle
            sx={{ fontWeight: "bold", fontSize: "24px", color: "#e53935" }}
          >
            ⚠️ Reservation Conflict
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ fontSize: "16px", color: "#d32f2f" }}>
              {errorMessage}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={() => setErrorDialog(false)}
              variant="contained"
              sx={{
                borderRadius: 3,
                px: 4,
                background: "#e53935",
                fontWeight: "bold",
                "&:hover": { background: "#c62828" }
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Reservation;
