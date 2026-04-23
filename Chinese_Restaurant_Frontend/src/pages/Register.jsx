import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Container, Box, Paper, Typography, Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.name || !form.email || !form.password) {
      setError("All fields required");
      setLoading(false);
      return;
    }

    try {
      await register(form);
      navigate("/login");
    } catch (error) {
      console.error("Register error", error);
      setError(error.response?.data?.message || error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
    backgroundImage: "url('https://img.pikbest.com/ai/illus_our/20230414/22f0828d0acdb9835438324953445cfb.jpg!w700wp')",
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
            Register
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Create your account to place orders and manage reservations.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              required
              autoComplete="name"
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
              autoComplete="new-password"
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
              disabled={loading}
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
              {loading ? "Registering..." : "Register"}
            </Button>
          </Box>

          <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError("")}>
            <Alert onClose={() => setError("")} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        </Paper>
      </Box>
    </Container>
    </div>
  );
}