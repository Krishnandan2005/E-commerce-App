import React, { useContext, useState } from "react";
import { Box, Button, styled } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../../redux/actions/cartActions";
import { DataContext } from "../../context/DataProvider";
import LoginDialog from "../Login/LoginDialog";

import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../../service/api";

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: "40%",
  padding: "40px 20px",

  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
}));

const ImageContainer = styled(Box)`
  padding: 15px 20px;
  border: 1px solid #f0f0f0;
  text-align: center;
`;

const Image = styled("img")`
  width: 100%;
  max-width: 350px;
  height: auto;
  object-fit: contain;
`;

const ButtonWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  width: 48%;
  height: 50px;
  border-radius: 8px;
  color: #fff;
`;

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

function ActionItem({ product }) {
  const [quantity] = useState(1);
  const [loginOpen, setLoginOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { account } = useContext(DataContext);

  // ======================================================
  // ADD TO CART
  // ======================================================

  const handleAddToCart = () => {
    if (!product?.id) {
      console.error("Product ID is missing");
      return;
    }

    // User is not logged in
    if (!account?._id) {
      setPendingAction("cart");
      setLoginOpen(true);
      return;
    }

    // Add product to cart
    dispatch(
      addToCart(
        product.id,
        quantity
      )
    );

    navigate("/cart");
  };

  // ======================================================
  // BUY NOW
  // ======================================================

  const handleBuyNow = async () => {
    if (!product?.id) {
      console.error("Product ID is missing");
      return;
    }

    // User is not logged in
    if (!account?._id) {
      setPendingAction("buy");
      setLoginOpen(true);
      return;
    }

    await proceedToCheckout();
  };

  // ======================================================
  // STRIPE CHECKOUT
  // ======================================================

  const proceedToCheckout = async () => {
    try {
      // Check login
      if (!account?._id) {
        alert(
          "Please login before making a payment."
        );
        return;
      }

      // Product price
      const price = Number(
        product?.price?.cost || 0
      );

      if (price <= 0) {
        console.error(
          "Invalid product price"
        );
        return;
      }

      // Product information for order
      const products = [
        {
          productId: product.id,

          title:
            product?.title?.longTitle ||
            product?.title?.shortTitle ||
            "Product",

          image:
            product?.detailUrl ||
            product?.url ||
            "",

          quantity: 1,

          price: price,

          mrp: Number(
            product?.price?.mrp || 0
          ),
        },
      ];

      // Complete checkout data
      const orderData = {
        userId: account._id,

        products,

        totalAmount: price,
      };

      console.log(
        "================================"
      );

      console.log(
        "BUY NOW ORDER DATA:",
        orderData
      );

      console.log(
        "User ID:",
        account._id
      );

      console.log(
        "Product:",
        products
      );

      console.log(
        "Total:",
        price
      );

      console.log(
        "================================"
      );

      // Create Stripe checkout session
      const session =
        await createCheckoutSession(
          orderData
        );

      console.log(
        "Stripe Session:",
        session
      );

      if (!session?.id) {
        console.error(
          "Stripe session ID is missing"
        );

        alert(
          "Unable to create payment session."
        );

        return;
      }

      // Load Stripe
      const stripe =
        await stripePromise;

      if (!stripe) {
        console.error(
          "Stripe failed to load"
        );

        return;
      }

      // Redirect to Stripe
      const result =
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });

      if (result?.error) {
        console.error(
          "Stripe redirect error:",
          result.error
        );
      }

    } catch (error) {
      console.error(
        "Checkout Error:",
        error
      );

      if (error.response) {
        console.error(
          "Server Status:",
          error.response.status
        );

        console.error(
          "Server Response:",
          error.response.data
        );
      }
    }
  };

  // ======================================================
  // AFTER LOGIN
  // ======================================================

  const handleLoginSuccess = async () => {
    setLoginOpen(false);

    if (pendingAction === "cart") {
      dispatch(
        addToCart(
          product.id,
          quantity
        )
      );

      navigate("/cart");
    }

    if (pendingAction === "buy") {
      await proceedToCheckout();
    }

    setPendingAction(null);
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <>
      <LeftContainer>

        {/* PRODUCT IMAGE */}

        <ImageContainer>
          <Image
            src={
              product?.detailUrl ||
              product?.url
            }
            alt={
              product?.title?.shortTitle ||
              "Product"
            }
          />
        </ImageContainer>

        {/* ACTION BUTTONS */}

        <ButtonWrapper>

          {/* ADD TO CART */}

          <StyledButton
            variant="contained"
            sx={{
              background: "#fa9c04",

              "&:hover": {
                background: "#e88b00",
              },
            }}
            onClick={handleAddToCart}
          >
            <AddShoppingCartIcon
              sx={{ mr: 1 }}
            />

            ADD TO CART
          </StyledButton>

          {/* BUY NOW */}

          <StyledButton
            variant="contained"
            onClick={handleBuyNow}
            sx={{
              background: "#19d65b",

              "&:hover": {
                background: "#12bd4e",
              },
            }}
          >
            <OfflineBoltIcon
              sx={{ mr: 1 }}
            />

            BUY NOW
          </StyledButton>

        </ButtonWrapper>

      </LeftContainer>

      {/* LOGIN DIALOG */}

      <LoginDialog
        open={loginOpen}
        setOpen={setLoginOpen}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default ActionItem;