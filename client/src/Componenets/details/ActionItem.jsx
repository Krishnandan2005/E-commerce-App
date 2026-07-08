import React, { useState } from "react";
import { Box, Button, styled } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";

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
  const buyNow = async () => {
    try {
        const session = await createCheckoutSession(500);

        const stripe = await stripePromise;

        await stripe.redirectToCheckout({
            sessionId: session.id,
        });

    } catch (error) {
        console.log(error);
    }
};

function ActionItem({ product }) {
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addItemToCart = () => {
    if (!product?.id) return;

    dispatch(addToCart(product.id, quantity));
    navigate("/cart");
  };

  return (
    <LeftContainer>
      <ImageContainer>
        <Image
          src={product?.detailUrl}
          alt={product?.title?.shortTitle}
        />
      </ImageContainer>

      <ButtonWrapper>
        <StyledButton
          variant="contained"
          sx={{ background: "#fa9c04" }}
          onClick={addItemToCart}
        >
          <AddShoppingCartIcon sx={{ mr: 1 }} />
          ADD TO CART
        </StyledButton>

        <StyledButton
          variant="contained" 
           onClick={() => buyNow()}
          sx={{ background: "#19d65b" }}
        >
          <OfflineBoltIcon sx={{ mr: 1 }} />
          BUY NOW
        </StyledButton>
      </ButtonWrapper>
    </LeftContainer>
  );
}

export default ActionItem;