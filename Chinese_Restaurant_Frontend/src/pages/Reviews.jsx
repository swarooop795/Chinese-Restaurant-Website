import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
  Rating,
  Divider,
} from "@mui/material";

const Reviews = () => {
  /* ---------------- STATE ---------------- */
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // Dummy Reviews (Frontend Only)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Rahul",
      rating: 5,
      comment: "Amazing Chinese food! Loved the noodles 🍜",
    },
    {
      id: 2,
      name: "Sneha",
      rating: 4,
      comment: "Great ambience and fast delivery.",
    },
  ]);

  /* ---------------- SUBMIT REVIEW ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !comment || rating === 0) {
      alert("Please complete all fields");
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      rating,
      comment,
    };

    setReviews([newReview, ...reviews]);

    setName("");
    setComment("");
    setRating(0);
  };

  /* ---------------- UI ---------------- */
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
        {/* ================= TITLE ================= */}
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
          Customer Reviews
        </Typography>

        {/* ================= REVIEW FORM ================= */}
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 5,
            mb: 6,
            maxWidth: 700,
            mx: "auto",
            background: "#fff",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            align="center"
            sx={{ mb: 4 }}
          >
            Write Your Review
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* NAME FIELD */}
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  Customer Name *
                </Typography>

                <TextField
                  fullWidth
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              {/* RATING FIELD */}
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  Rating *
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: 56,
                    pl: 1,
                    border: "1px solid #f5f4f4",
                    borderRadius: 1,
                  }}
                >
                  <Rating
                    value={rating}
                    size="large"
                    onChange={(event, newValue) => setRating(newValue)}
                  />
                </Box>
              </Grid>

              {/* COMMENT FIELD */}
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  Your Review *
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={1}
                  placeholder="Share your dining experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Grid>

              {/* SUBMIT BUTTON */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.6,
                    mt: 1,
                    borderRadius: 3,
                    fontWeight: "bold",
                    fontSize: "16px",
                    textTransform: "none",
                    background: "linear-gradient(#d32f2f;)",
                    "&:hover": {
                      background: "linear-gradient(rgb(147, 32, 32))",
                    },
                  }}
                >
                  SUBMIT REVIEW
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        {/* ================= REVIEW LIST ================= */}

        <Typography
          variant="h4"
          component="h1"
          align="center"
          fontWeight={800}
          sx={{
            mb: 5,
            letterSpacing: 1,
            color: "#2c3e50",
          }}
        >
          Customer Feedback
        </Typography>

        {reviews.map((review) => (
          <Paper
            key={review.id}
            elevation={8}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 5,
              transition: "all 0.35s ease",
              background: "linear-gradient(145deg,#ffffff,#f7f7f7)",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                sx={{
                  width: 55,
                  height: 55,
                  fontWeight: "bold",
                  bgcolor: "#dd2476",
                }}
              >
                {review.name.charAt(0)}
              </Avatar>

              <Box flex={1}>
                <Typography fontWeight="bold" fontSize="18px">
                  {review.name}
                </Typography>

                <Rating value={review.rating} readOnly size="small" />
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography
              sx={{
                fontSize: "15px",
                color: "#444",
                lineHeight: 1.7,
              }}
            >
              {review.comment}
            </Typography>
          </Paper>
        ))}
      </Container>
    </Box>
  );
};

export default Reviews;
