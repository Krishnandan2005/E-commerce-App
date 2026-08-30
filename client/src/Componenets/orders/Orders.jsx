import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  styled,
} from "@mui/material";

import { DataContext } from "../../context/DataProvider";
import { getUserOrders } from "../../service/api";

const Container = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 55px)",
  background: "#f1f5f9",
  padding: "30px 10%",

  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "15px",
  },
}));

const Header = styled(Box)`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const OrderCard = styled(Card)`
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ProductRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  padding: "15px 0",

  [theme.breakpoints.down("sm")]: {
    gap: "12px",
  },
}));

const ProductImage = styled("img")`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const EmptyBox = styled(Box)`
  background: #ffffff;
  padding: 50px 20px;
  text-align: center;
  border-radius: 8px;
`;

const Orders = () => {
  const { account } = useContext(DataContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!account?._id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getUserOrders(account._id);

        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Orders Error:", error);
        setError("Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [account]);

  // NOT LOGGED IN
  if (!account) {
    return (
      <Container>
        <EmptyBox>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600 }}
          >
            Please login to view your orders
          </Typography>

          <Typography
            sx={{
              color: "#878787",
              mt: 1,
            }}
          >
            Login to see your previous purchases.
          </Typography>
        </EmptyBox>
      </Container>
    );
  }

  // LOADING
  if (loading) {
    return (
      <Container>
        <Header>
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            My Orders
          </Typography>
        </Header>

        <EmptyBox>
          <Typography>
            Loading your orders...
          </Typography>
        </EmptyBox>
      </Container>
    );
  }

  // ERROR
  if (error) {
    return (
      <Container>
        <EmptyBox>
          <Typography sx={{ color: "#dc2626" }}>
            {error}
          </Typography>
        </EmptyBox>
      </Container>
    );
  }

  // NO ORDERS
  if (orders.length === 0) {
    return (
      <Container>
        <Header>
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            My Orders
          </Typography>

          <Typography
            sx={{
              color: "#878787",
              mt: 0.5,
            }}
          >
            Track your past purchases
          </Typography>
        </Header>

        <EmptyBox>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600 }}
          >
            No orders yet
          </Typography>

          <Typography
            sx={{
              color: "#878787",
              mt: 1,
            }}
          >
            Your orders will appear here after you
            make a purchase.
          </Typography>
        </EmptyBox>
      </Container>
    );
  }

  // ORDERS
  return (
    <Container>
      <Header>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          My Orders
        </Typography>

        <Typography
          sx={{
            color: "#878787",
            mt: 0.5,
          }}
        >
          Track your past purchases
        </Typography>
      </Header>

      {orders.map((order) => (
        <OrderCard key={order._id}>
          <CardContent>

            {/* ORDER HEADER */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Order #{order.orderId}
                </Typography>

                <Typography
                  sx={{
                    color: "#878787",
                    fontSize: 13,
                    mt: 0.5,
                  }}
                >
                  Ordered on{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Typography>
              </Box>

              <Chip
                label={order.orderStatus}
                color={
                  order.orderStatus === "Delivered"
                    ? "success"
                    : order.orderStatus === "Cancelled"
                    ? "error"
                    : "warning"
                }
                size="small"
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* PRODUCTS */}
            {order.products.map((product) => (
              <ProductRow key={product._id}>
                <ProductImage
                  src={product.image}
                  alt={product.title}
                />

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#878787",
                      mt: 1,
                    }}
                  >
                    Quantity: {product.quantity}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 600,
                      mt: 1,
                    }}
                  >
                    ₹
                    {(
                      product.price *
                      product.quantity
                    ).toLocaleString("en-IN")}
                  </Typography>
                </Box>
              </ProductRow>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* ORDER FOOTER */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#878787",
                  }}
                >
                  Payment Status
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 600,
                    color:
                      order.paymentStatus === "Paid"
                        ? "#388e3c"
                        : "#d97706",
                  }}
                >
                  {order.paymentStatus}
                </Typography>
              </Box>

              <Box sx={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#878787",
                  }}
                >
                  Total Amount
                </Typography>

                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  ₹
                  {Number(
                    order.totalAmount
                  ).toLocaleString("en-IN")}
                </Typography>
              </Box>
            </Box>

          </CardContent>
        </OrderCard>
      ))}
    </Container>
  );
};

export default Orders;