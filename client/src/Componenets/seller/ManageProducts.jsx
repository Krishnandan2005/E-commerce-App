import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  styled,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled(Box)`
  min-height: calc(100vh - 55px);
  background: #f1f5f9;
  padding: 30px;
`;

const Header = styled(Box)`
  background: #ffffff;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const ProductGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled(Paper)`
  padding: 18px;
  border-radius: 12px;
  background: #ffffff;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ProductImage = styled("img")`
  width: 100%;
  height: 180px;
  object-fit: contain;
  margin-bottom: 15px;
`;

const ActionBox = styled(Box)`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const FormGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ManageProducts = () => {
  const navigate = useNavigate();

  const seller = JSON.parse(localStorage.getItem("seller"));

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [editData, setEditData] = useState({
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

  // ======================================================
  // GET SELLER PRODUCTS
  // ======================================================

  const fetchProducts = async () => {
    try {
      if (!seller?.id) {
        return;
      }

      setLoading(true);

      const response = await axios.get(
        `http://localhost:3000/seller/products/${seller.id}`
      );

      setProducts(response.data);
    } catch (error) {
      console.log(
        error.response?.data?.message ||
          "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ======================================================
  // DELETE PRODUCT
  // ======================================================

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/seller/products/${productId}`,
        {
          data: {
            sellerId: seller.id,
          },
        }
      );

      alert("Product deleted successfully!");

      fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  // ======================================================
  // OPEN EDIT
  // ======================================================

  const handleEditOpen = (product) => {
    setSelectedProduct(product);

    setEditData({
      url: product.url || "",
      detailUrl: product.detailUrl || "",

      shortTitle:
        product.title?.shortTitle || "",

      longTitle:
        product.title?.longTitle || "",

      category:
        product.category || "",

      mrp:
        product.price?.mrp || "",

      cost:
        product.price?.cost || "",

      discount:
        product.price?.discount ||
        product.discount ||
        "",

      quantity:
        product.quantity || "",

      description:
        product.description || "",

      tagline:
        product.tagline || "",
    });

    setEditOpen(true);
  };

  // ======================================================
  // CLOSE EDIT
  // ======================================================

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedProduct(null);
  };

  // ======================================================
  // EDIT INPUT
  // ======================================================

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // ======================================================
  // UPDATE PRODUCT
  // ======================================================

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/seller/products/${selectedProduct.id}`,
        {
          sellerId: seller.id,

          url: editData.url,
          detailUrl: editData.detailUrl,

          shortTitle: editData.shortTitle,
          longTitle: editData.longTitle,

          category: editData.category,

          mrp: Number(editData.mrp),
          cost: Number(editData.cost),

          discount: editData.discount,

          quantity: Number(editData.quantity),

          description: editData.description,
          tagline: editData.tagline,
        }
      );

      alert("Product updated successfully!");

      handleEditClose();

      fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update product"
      );
    }
  };

  // ======================================================
  // NO SELLER
  // ======================================================

  if (!seller?.id) {
    return (
      <Container>
        <Paper
          sx={{
            padding: 5,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography>
            Seller session not found.
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 2,
              textTransform: "none",
              background: "#1e293b",
            }}
            onClick={() => navigate("/seller")}
          >
            Go to Seller Login
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container>
      {/* HEADER */}

      <Header>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
            }}
          >
            Manage Products
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: 14,
              mt: 0.5,
            }}
          >
            Manage all products added by you
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() =>
            navigate("/seller/dashboard")
          }
          sx={{
            textTransform: "none",
          }}
        >
          Dashboard
        </Button>
      </Header>

      {/* LOADING */}

      {loading ? (
        <Paper
          sx={{
            padding: 6,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <CircularProgress />

          <Typography sx={{ mt: 2 }}>
            Loading your products...
          </Typography>
        </Paper>
      ) : products.length === 0 ? (
        /* EMPTY */

        <Paper
          sx={{
            padding: 6,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600 }}
          >
            No products found
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              mt: 1,
            }}
          >
            You haven't added any products yet.
          </Typography>

          <Button
            variant="contained"
            onClick={() =>
              navigate("/seller/add-product")
            }
            sx={{
              mt: 3,
              background: "#1e293b",
              textTransform: "none",
              "&:hover": {
                background: "#334155",
              },
            }}
          >
            Add Your First Product
          </Button>
        </Paper>
      ) : (
        /* PRODUCTS */

        <ProductGrid>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              elevation={0}
            >
              <ProductImage
                src={
                  product.url ||
                  "https://via.placeholder.com/300"
                }
                alt={
                  product.title?.shortTitle ||
                  "Product"
                }
              />

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#1e293b",
                }}
              >
                {product.title?.shortTitle}
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: 13,
                  mt: 1,
                }}
              >
                {product.category}
              </Typography>

              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  mt: 1,
                  color: "#1e293b",
                }}
              >
                ₹{product.price?.cost}
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#64748b",
                  mt: 0.5,
                }}
              >
                Quantity: {product.quantity}
              </Typography>

              <ActionBox>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() =>
                    handleEditOpen(product)
                  }
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Edit
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() =>
                    handleDelete(product.id)
                  }
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Delete
                </Button>
              </ActionBox>
            </ProductCard>
          ))}
        </ProductGrid>
      )}

      {/* ==================================================
          EDIT PRODUCT DIALOG
      ================================================== */}

      <Dialog
        open={editOpen}
        onClose={handleEditClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
          }}
        >
          Edit Product
        </DialogTitle>

        <DialogContent>
          <FormGrid sx={{ mt: 1 }}>
            <TextField
              label="Product Image URL"
              name="url"
              value={editData.url}
              onChange={handleEditChange}
              fullWidth
            />

            <TextField
              label="Product Detail URL"
              name="detailUrl"
              value={editData.detailUrl}
              onChange={handleEditChange}
              fullWidth
            />

            <TextField
              label="Short Title"
              name="shortTitle"
              value={editData.shortTitle}
              onChange={handleEditChange}
              fullWidth
            />

            <TextField
              label="Long Title"
              name="longTitle"
              value={editData.longTitle}
              onChange={handleEditChange}
              fullWidth
            />

            <TextField
              select
              label="Category"
              name="category"
              value={editData.category}
              onChange={handleEditChange}
              fullWidth
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
              label="MRP"
              name="mrp"
              type="number"
              value={editData.mrp}
              onChange={handleEditChange}
              fullWidth
            />

            <TextField
              label="Selling Price"
              name="cost"
              type="number"
              value={editData.cost}
              onChange={handleEditChange}
              fullWidth
            />

            <TextField
              label="Discount"
              name="discount"
              value={editData.discount}
              onChange={handleEditChange}
              fullWidth
            />

            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={editData.quantity}
              onChange={handleEditChange}
              fullWidth
            />

            <TextField
              label="Tagline"
              name="tagline"
              value={editData.tagline}
              onChange={handleEditChange}
              fullWidth
            />
          </FormGrid>

          <TextField
            label="Description"
            name="description"
            value={editData.description}
            onChange={handleEditChange}
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions sx={{ padding: 2 }}>
          <Button
            onClick={handleEditClose}
            sx={{
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              background: "#1e293b",
              textTransform: "none",
              "&:hover": {
                background: "#334155",
              },
            }}
          >
            Update Product
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageProducts;