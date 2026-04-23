import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Container, Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();


  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [dialog, setDialog] = useState({
  open: false,
  message: ""
});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password){
      setDialog({
      open: true,
      message: "Please enter email and password"
      });
      return;
    }

    try {
      const result = await login(form);
      const redirectPath = result.user.role === 'admin' ? '/admin' : '/menu';
      navigate(redirectPath); 
    } catch (error) {
      console.error("Login error", error);
      setDialog({
       open: true,
       message:
       error.response?.data?.message ||
       error.message ||
      "Login failed"
      });
    }
  };

  return (
    <div style={{
    backgroundImage: "url('https://t4.ftcdn.net/jpg/06/97/44/23/360_F_697442399_tiQtMVHs5ZyeMUEVOz1WGVPdBMThyGYX.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  }}>
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper elevation={4} sx={{ width: "100%", p: 4, borderRadius: 3 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Login
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Enter your credentials to access your account.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              autoComplete="email"
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1976d2',
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              required
              autoComplete="current-password"
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1976d2',
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="medium"
              sx={{
                width: '60%',
                mx: 'auto',
                display: 'block',
                backgroundColor: '#1976d2',
                color: '#fff',
                py: 1.2,
                fontSize: '0.95rem',
                '&:hover': {
                  backgroundColor: '#115293',
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
    <Dialog
  open={dialog.open}
  onClose={() => setDialog({ ...dialog, open: false })}
>
  <DialogTitle sx={{ fontWeight: "bold" }}>
    Login Error
  </DialogTitle>

  <DialogContent>
    <DialogContentText>
      {dialog.message}
    </DialogContentText>
  </DialogContent>

  <DialogActions>
    <Button
      variant="contained"
      onClick={() => setDialog({ ...dialog, open: false })}
    >
      OK
    </Button>
  </DialogActions>
</Dialog>
    </div>
  );
}