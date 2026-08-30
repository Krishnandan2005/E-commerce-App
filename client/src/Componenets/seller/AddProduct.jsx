import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  styled,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled(Box)`
  min-height: calc(100vh - 55px);
  background: #f1f5f9;
  padding: 30px;
`;

const Card = styled(Paper)`
  max-width: 850px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 12px;
`;

const FormGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const AddProduct = () => {
  const navigate = useNavigate();

  const seller = JSON.parse(localStorage.getItem("seller"));

  const API_URL = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState({
    url: "",
    detailUrl: "",
    shortTitle: "",
    longTitle: "",
    category: "",
    mrp: "",
    cost: "",
    discount: "",
    quantity: "",
    description: "",
    tagline: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!seller?.id) {
      setError(
        "Seller login session not found. Please login again."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${API_URL}/seller/products`,
        {
          sellerId: seller.id,

          url: product.url,
          detailUrl: product.detailUrl,

          shortTitle: product.shortTitle,
          longTitle: product.longTitle,

          category: product.category,

          mrp: Number(product.mrp),
          cost: Number(product.cost),

          discount: product.discount,

          quantity: Number(product.quantity),

          description: product.description,
          tagline: product.tagline,
        }
      );

      if (response.status === 201) {
        alert("Product added successfully!");

        setProduct({
          url: "",
          detailUrl: "",
          shortTitle: "",
          longTitle: "",
          category: "",
          mrp: "",
          cost: "",
          discount: "",
          quantity: "",
          description: "",
          tagline: "",
        });

        navigate("/seller/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card elevation={0}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#1e293b",
            mb: 1,
          }}
        >
          Add Product
        </Typography>

        <Typography
          sx={{
            color: "#64748b",
            fontSize: 14,
            mb: 3,
          }}
        >
          Add a new product to your QuickCart247 store.
        </Typography>

        {error && (
          <Typography
            sx={{
              color: "#dc2626",
              fontSize: 14,
              mb: 2,
            }}
          >
            {error}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <FormGrid>
            <TextField
              fullWidth
              label="Product Image URL"
              name="url"
              value={product.url}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Product Detail URL"
              name="detailUrl"
              value={product.detailUrl}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Short Title"
              name="shortTitle"
              value={product.shortTitle}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Long Title"
              name="longTitle"
              value={product.longTitle}
              onChange={handleChange}
              required
            />

            <TextField
              select
              fullWidth
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <MenuItem value="Top Offers">
                Top Offers
              </MenuItem>

              <MenuItem value="Grocery">
                Grocery
              </MenuItem>

              <MenuItem value="Mobile">
                Mobile
              </MenuItem>

              <MenuItem value="Fashion">
                Fashion
              </MenuItem>

              <MenuItem value="Beauty">
                Beauty
              </MenuItem>

              <MenuItem value="Electronics">
                Electronics
              </MenuItem>

              <MenuItem value="Home">
                Home
              </MenuItem>

              <MenuItem value="Accessories">
                Accessories
              </MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="MRP"
              name="mrp"
              type="number"
              value={product.mrp}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Selling Price"
              name="cost"
              type="number"
              value={product.cost}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Discount"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              placeholder="20% off"
            />

            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={product.quantity}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Tagline"
              name="tagline"
              value={product.tagline}
              onChange={handleChange}
              placeholder="Best seller"
            />
          </FormGrid>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={() =>
                navigate("/seller/dashboard")
              }
              sx={{
                textTransform: "none",
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                background: "#1e293b",
                textTransform: "none",
                fontWeight: 600,
                px: 4,

                "&:hover": {
                  background: "#334155",
                },
              }}
            >
              {loading
                ? "Adding Product..."
                : "Add Product"}
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default AddProduct;