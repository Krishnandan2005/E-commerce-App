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

  // Which action should continue after login?
  const [pendingAction, setPendingAction] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { account } = useContext(DataContext);

  // ======================================================
  // ADD TO CART
  // ======================================================

  const handleAddToCart = () => {
    if (!product?.id) return;

    // User is NOT logged in
    if (!account) {
      setPendingAction("cart");
      setLoginOpen(true);
      return;
    }

    // User is logged in
    dispatch(addToCart(product.id, quantity));
    navigate("/cart");
  };

  // ======================================================
  // BUY NOW
  // ======================================================

  const handleBuyNow = async () => {
    if (!product?.id) return;

    // User is NOT logged in
    if (!account) {
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
      const session = await createCheckoutSession(
        product?.price?.cost || 500
      );

      const stripe = await stripePromise;

      if (!stripe) {
        console.error("Stripe failed to load");
        return;
      }

      await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.error("Checkout Error:", error);
    }
  };

  // ======================================================
  // AFTER LOGIN/SIGNUP
  // ======================================================

  const handleLoginSuccess = async () => {
    setLoginOpen(false);

    if (pendingAction === "cart") {
      dispatch(addToCart(product.id, quantity));
      navigate("/cart");
    }

    if (pendingAction === "buy") {
      await proceedToCheckout();
    }

    setPendingAction(null);
  };

  return (
    <>
      <LeftContainer>

        {/* PRODUCT IMAGE */}

        <ImageContainer>
          <Image
  src={product?.detailUrl || product?.url}
  alt={product?.title?.shortTitle || "Product"}
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
            <AddShoppingCartIcon sx={{ mr: 1 }} />

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
            <OfflineBoltIcon sx={{ mr: 1 }} />

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