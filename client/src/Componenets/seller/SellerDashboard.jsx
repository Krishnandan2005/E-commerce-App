import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  styled,
} from "@mui/material";

import AddBoxIcon from "@mui/icons-material/AddBox";
import InventoryIcon from "@mui/icons-material/Inventory";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";

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
  margin-bottom: 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const Cards = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const IconBox = styled(Box)`
  width: 55px;
  height: 55px;
  border-radius: 10px;
  background: #eef2ff;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 15px;
`;

const SellerDashboard = () => {
  const navigate = useNavigate();

  const seller = JSON.parse(
    localStorage.getItem("seller")
  );

  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // ======================================================
  // FETCH SELLER PRODUCTS
  // ======================================================

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        if (!seller?.id) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/seller/products/${seller.id}`
        );

        setProductCount(response.data.length);
      } catch (error) {
        console.log(
          error.response?.data?.message ||
            "Failed to fetch seller products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, [seller?.id]);

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    localStorage.removeItem("seller");
    navigate("/seller");
  };

  // ======================================================
  // SELLER SESSION CHECK
  // ======================================================

  if (!seller?.id) {
    return (
      <Container>
        <Box
          sx={{
            background: "#fff",
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
            onClick={() => navigate("/seller")}
            sx={{
              mt: 2,
              textTransform: "none",
              background: "#1e293b",
            }}
          >
            Go to Seller Login
          </Button>
        </Box>
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
            Welcome, {seller.firstname || "Seller"}
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: 14,
              mt: 0.5,
            }}
          >
            Manage your QuickCart247 store
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            color: "#dc2626",
            borderColor: "#dc2626",

            "&:hover": {
              borderColor: "#b91c1c",
              background: "#fef2f2",
            },
          }}
        >
          Logout
        </Button>
      </Header>

      {/* DASHBOARD CARDS */}

      <Cards>

        {/* TOTAL PRODUCTS */}

        <DashboardCard>
          <CardContent sx={{ padding: 3 }}>
            <IconBox>
              <InventoryIcon
                sx={{
                  color: "#4f46e5",
                  fontSize: 30,
                }}
              />
            </IconBox>

            <Typography
              sx={{
                color: "#64748b",
                fontSize: 14,
              }}
            >
              Total Products
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1e293b",
                mt: 1,
              }}
            >
              {loading ? "..." : productCount}
            </Typography>
          </CardContent>
        </DashboardCard>

        {/* ADD PRODUCT */}

        <DashboardCard>
          <CardContent sx={{ padding: 3 }}>
            <IconBox>
              <AddBoxIcon
                sx={{
                  color: "#0f766e",
                  fontSize: 30,
                }}
              />
            </IconBox>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              Add Product
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                fontSize: 14,
                mt: 1,
                mb: 2,
              }}
            >
              Add a new product to your store.
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddBoxIcon />}
              onClick={() =>
                navigate("/seller/add-product")
              }
              sx={{
                background: "#1e293b",
                textTransform: "none",
                fontWeight: 600,

                "&:hover": {
                  background: "#334155",
                },
              }}
            >
              Add Product
            </Button>
          </CardContent>
        </DashboardCard>

        {/* MANAGE PRODUCTS */}

        <DashboardCard>
          <CardContent sx={{ padding: 3 }}>
            <IconBox>
              <StorefrontIcon
                sx={{
                  color: "#ea580c",
                  fontSize: 30,
                }}
              />
            </IconBox>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              Manage Products
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                fontSize: 14,
                mt: 1,
                mb: 2,
              }}
            >
              View, edit and delete your products.
            </Typography>

            <Button
              variant="contained"
              startIcon={<StorefrontIcon />}
              onClick={() =>
                navigate("/seller/products")
              }
              sx={{
                background: "#1e293b",
                textTransform: "none",
                fontWeight: 600,

                "&:hover": {
                  background: "#334155",
                },
              }}
            >
              Manage Products
            </Button>
          </CardContent>
        </DashboardCard>

      </Cards>
    </Container>
  );
};

export default SellerDashboard;