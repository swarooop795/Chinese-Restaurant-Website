import { useEffect, useState } from "react";
import { Container, Grid, Button, Box, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FoodCard from "../components/FoodCard";
import { getMenuItems } from "../api/Api.jsx";

export default function Menu() {

  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenuItems();
      setFoods(data);
    };
    fetchData();
  }, []);

  const categories = ["All", "Noodles", "Rice", "Dumplings", "Appetizers"];

  const filteredFoods = foods.filter((f) => {
    const matchCategory = category === "All" || f.category === category;
    const matchSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Ensure _id compatibility for Cart
  const foodsWithId = filteredFoods.map(f => ({ ...f, _id: f.id || f._id }));

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
            Our Menu
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#666", fontSize: "1.1rem" }}
          >
            Discover our delicious selection of authentic Chinese dishes
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 6, display: "flex", justifyContent: "center" }}>
          <TextField
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: "100%", md: "500px" },
              backgroundColor: "white",
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                fontSize: "1.1rem",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 2, color: "#2c3e50" }} />,
            }}
          />
        </Box>

        {/* Category Filter */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 8,
            pb: 4,
            borderBottom: "2px solid rgba(0,0,0,0.1)",
          }}
        >
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "contained" : "outlined"}
              onClick={() => setCategory(cat)}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                transition: "all 0.3s ease",
                border: "2px solid",
                borderColor: category === cat ? "primary.main" : "#ccc",
                color: category === cat ? "#fff" : "#2c3e50",
                backgroundColor: category === cat ? "primary.main" : "transparent",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                },
              }}
            >
              {cat}
            </Button>
          ))}
        </Box>

        {/* Food List */}
        {filteredFoods.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" sx={{ color: "#666" }}>
              No dishes found matching your search.
            </Typography>
          </Box>
        ) : (
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            {foodsWithId.map((food) => (
              <Grid item xs={12} sm={6} md={4} key={food._id}>
                <FoodCard food={food} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
