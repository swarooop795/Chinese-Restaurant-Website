import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#d32f2f" },
    secondary: { main: "#ff9800" },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default theme;