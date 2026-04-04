import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        background: "#111",
        color: "white",
        textAlign: "center",
        padding: 2,
        marginTop: "auto"
      }}
    >
      <Typography>
        © 2026 Chinese Restaurant | All Rights Reserved
      </Typography>
    </Box>
  );
}