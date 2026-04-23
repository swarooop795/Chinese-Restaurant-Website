import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Home() {
  const features = [
    {
      title: "Noodles",
      description:
        "Freshly tossed noodles with rich, savory sauces and crisp vegetables.",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
    },
    {
      title: "Spring Rolls",
      description:
        "Golden crispy spring rolls filled with fresh vegetables and delicate flavors.",
      image: "https://d1mxd7n691o8sz.cloudfront.net/static/recipe/recipe/2023-12/Vegetable-Spring-Rolls-2-1-906001560ca545c8bc72baf473f230b4_thumbnail_170.jpeg",
    },
    {
      title: "Dumplings",
      description:
        "Handmade dumplings packed with premium fillings and aromatic spices.",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
    },
    {
      title: "Fried Rice",
      description:
        "Perfectly seasoned fried rice with vibrant colors and bold flavors.",
      image: "https://cicili.tv/wp-content/uploads/2024/08/Chicken-Fried-Rice-Small-2-1200x900.jpg",
    },
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f8f7f3 0%, #e8e6e3 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "60vh", md: "70vh" },
          backgroundImage:
            "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%), url(https://t4.ftcdn.net/jpg/06/46/39/27/360_F_646392788_UNuAnq71rLE0Ikw9ZOrkDsoDvCsBVZk5.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          px: 3,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255,255,255,0.05)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            fontWeight={900}
            sx={{
              letterSpacing: 1.5,
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Welcome to Golden Dragon Chinese Restaurant
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.7,
              maxWidth: 750,
              mx: "auto",
              fontWeight: 300,
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            Experience authentic Chinese cuisine made from fresh ingredients,
            crafted by skilled chefs, and served in an inviting atmosphere.
          </Typography>
        </Container>
      </Box>

      {/* About Us Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 8, md: 10 },
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            fontWeight={800}
            gutterBottom
            sx={{ color: "#2c3e50", mb: 3 }}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 850,
              mx: "auto",
              color: "#34495e",
              lineHeight: 1.9,
              fontSize: "1.15rem",
              fontWeight: 400,
            }}
          >
            Golden Dragon Chinese Restaurant offers authentic Chinese cuisine
            prepared with traditional flavors and modern culinary techniques. We
            deliver warm hospitality, fast service, and memorable dishes that
            keep guests coming back.
          </Typography>
        </Box>

        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <Typography
            variant="h3"
            fontWeight={800}
            textAlign="center"
            sx={{ color: "#2c3e50", mb: 6 }}
          >
            Our Specialties
          </Typography>

          <Grid container spacing={4}>
            {features.map((item) => (
              <Grid
                key={item.title}
                size={{ xs: 12, md: 6 }} 
              >
                <Card
                  elevation={6}
                  sx={{
                    height: "100%",
                    borderRadius: 5,
                    overflow: "hidden",
                    transition: "0.4s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={item.image}
                    alt={item.title}
                  />

                  <CardContent>
                    <Typography variant="h6" fontWeight={700}>
                      {item.title}
                    </Typography>

                    <Typography variant="body2">{item.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Us Section */}
        <Box>
          <Typography
            variant="h3"
            component="h2"
            fontWeight={800}
            textAlign="center"
            gutterBottom
            sx={{ color: "#2c3e50", mb: 6 }}
          >
            Contact Us
          </Typography>
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={4}
                sx={{
                  p: 5,
                  borderRadius: 5,
                  textAlign: "center",
                  height: "130px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background:
                    "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <PhoneIcon sx={{ fontSize: 48, color: "#e74c3c" }} />
                </Box>
                <Typography
                  variant="h6"
                  fontWeight={800}
                  gutterBottom
                  sx={{ color: "#2c3e50" }}
                >
                  Phone
                </Typography>
                <Typography sx={{ color: "#34495e", fontWeight: 500 }}>
                  +91 89512 40738
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={4}
                sx={{
                  p: 5,
                  borderRadius: 5,
                  textAlign: "center",
                  height: "130px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background:
                    "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <EmailIcon sx={{ fontSize: 48, color: "#3498db" }} />
                </Box>
                <Typography
                  variant="h6"
                  fontWeight={800}
                  gutterBottom
                  sx={{ color: "#2c3e50" }}
                >
                  Email
                </Typography>
                <Typography sx={{ color: "#34495e", fontWeight: 500 }}>
                  dragonrestaurant@gmail.com
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={4}
                sx={{
                  p: 5,
                  borderRadius: 5,
                  textAlign: "center",
                  height: "130px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background:
                    "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <WhatsAppIcon sx={{ fontSize: 48, color: "#25d366" }} />
                </Box>
                <Typography
                  variant="h6"
                  fontWeight={800}
                  gutterBottom
                  sx={{ color: "#2c3e50" }}
                >
                  WhatsApp
                </Typography>
                <Typography sx={{ color: "#34495e", fontWeight: 500 }}>
                  +91 89512 40738
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
