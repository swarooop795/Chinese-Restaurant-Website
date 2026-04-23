import {AppBar,Toolbar,Typography,Button,Box} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" sx={{ height: "82px", display: "flex", justifyContent: "center" }}>
      <Toolbar sx={{ minHeight: "50px" }}>

        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, gap: 2 }}>
          <img src="/image.png" alt="logo" style={{ height: "50px", width: "auto" }} />
          <Typography variant="h6">
            Golden Dragon Chinese Restaurant
          </Typography>
        </Box>

        <Box>
          {!user ? (
            <Button
              color="inherit"
              component={Link}
              to="/"
              variant={location.pathname === "/" ? "outlined" : "text"}
              sx={{
                backgroundColor: location.pathname === "/" ? "rgba(255, 255, 255, 0.1)" : "transparent",
                borderColor: location.pathname === "/" ? "white" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)"
                }
              }}
            >
              Home
            </Button>
          ) : null}
{user && user.role !== 'admin' && (
            <Button
              color="inherit"
              component={Link}
              to="/menu"
              variant={location.pathname === "/menu" ? "outlined" : "text"}
              sx={{
                backgroundColor: location.pathname === "/menu" ? "rgba(255, 255, 255, 0.1)" : "transparent",
                borderColor: location.pathname === "/menu" ? "white" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)"
                }
              }}
            >
              Menu
            </Button>
          )}

{user && user.role !== 'admin' && (
            <Button
              color="inherit"
              component={Link}
              to="/cart"
              variant={location.pathname === "/cart" ? "outlined" : "text"}
              sx={{
                backgroundColor: location.pathname === "/cart" ? "rgba(255, 255, 255, 0.1)" : "transparent",
                borderColor: location.pathname === "/cart" ? "white" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)"
                }
              }}
            >
              Cart
            </Button>
          )}

{user && user.role !== 'admin' && (
            <Button
              color="inherit"
              component={Link}
              to="/orders"
              variant={location.pathname === "/orders" ? "outlined" : "text"}
              sx={{
                backgroundColor: location.pathname === "/orders" ? "rgba(255, 255, 255, 0.1)" : "transparent",
                borderColor: location.pathname === "/orders" ? "white" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)"
                }
              }}
            >
              Orders
            </Button>
          )}

{user && user.role !== 'admin' && (
            <Button
              color="inherit"
              component={Link}
              to="/reservation"
              variant={location.pathname === "/reservation" ? "outlined" : "text"}
              sx={{
                backgroundColor: location.pathname === "/reservation" ? "rgba(255, 255, 255, 0.1)" : "transparent",
                borderColor: location.pathname === "/reservation" ? "white" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)"
                }
              }}
            >
              Reservation
            </Button>
          )}

{user && user.role !== 'admin' && (
            <Button
              color="inherit"
              component={Link}
              to="/reviews"
              variant={location.pathname === "/reviews" ? "outlined" : "text"}
              sx={{
                backgroundColor: location.pathname === "/reviews" ? "rgba(255, 255, 255, 0.1)" : "transparent",
                borderColor: location.pathname === "/reviews" ? "white" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)"
                }
              }}
            >
              Reviews
            </Button>
          )}

{user?.role === 'admin' && (
            <Button
              color="inherit"
              component={Link}
              to="/admin"
              variant={location.pathname === "/admin" ? "outlined" : "text"}
              sx={{
                backgroundColor: location.pathname === "/admin" ? "rgba(255, 255, 255, 0.1)" : "transparent",
                borderColor: location.pathname === "/admin" ? "white" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)"
                }
              }}
            >
              Admin
            </Button>
          )}
{user ? (
            <Button color="inherit" onClick={logout}>
              Logout ({user.name})
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                variant={location.pathname === "/login" ? "outlined" : "text"}
                sx={{
                  backgroundColor: location.pathname === "/login" ? "rgba(255, 255, 255, 0.1)" : "transparent",
                  borderColor: location.pathname === "/login" ? "white" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)"
                  }
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                variant={location.pathname === "/register" ? "outlined" : "text"}
                sx={{
                  backgroundColor: location.pathname === "/register" ? "rgba(255, 255, 255, 0.1)" : "transparent",
                  borderColor: location.pathname === "/register" ? "white" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)"
                  }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}