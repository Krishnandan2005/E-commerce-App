import { useEffect } from "react";
import { Box, Typography, Button, Grid, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../../service/api";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

import TotalAmount from "./TotalAmount";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";


const Component = styled(Grid)(({ theme }) => ({
  padding: "30px 135px",
  [theme.breakpoints.down("sm")]: {
    padding: "15px 0",
  },
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down("sm")]: {
    marginBottom: 15,
  },
}));

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
`;

const BottomWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #069b15;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && !cartItems.some((item) => item.id === id)) {
      dispatch(addToCart(id));
    }
  }, [dispatch, id, cartItems]);

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

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

  return (
    <>
      {cartItems.length ? (
        <Component container spacing={2}>
          <LeftComponent size={{ xs: 12, sm: 12, md: 9, lg: 9 }}>
            <Header>
              <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
                My Cart ({cartItems.length})
              </Typography>
            </Header>

            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeItemFromCart={removeItemFromCart}
              />
            ))}

            <BottomWrapper>
              <StyledButton variant="contained" onClick={buyNow}>
                Place Order
              </StyledButton>
            </BottomWrapper>
          </LeftComponent>

          <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
            <TotalAmount cartItems={cartItems} />
          </Grid>
        </Component>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;