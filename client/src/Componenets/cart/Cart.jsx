import { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  styled,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../../service/api";

import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
} from "../../redux/actions/cartActions";

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

  &:hover {
    background: #058a12;
  }
`;

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const Cart = () => {
  const { cartItems } = useSelector(
    (state) => state.cart
  );

  const { id } = useParams();

  const dispatch = useDispatch();

  // ======================================================
  // ADD PRODUCT FROM PRODUCT URL
  // ======================================================

  useEffect(() => {
    if (
      id &&
      !cartItems.some((item) => item.id === id)
    ) {
      dispatch(addToCart(id, 1));
    }
  }, [dispatch, id, cartItems]);

  // ======================================================
  // REMOVE ITEM
  // ======================================================

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  // ======================================================
  // CALCULATE CART TOTAL
  // ======================================================

  const calculateTotal = () => {
    const totalCost = cartItems.reduce(
      (total, item) => {
        const price = Number(
          item.price?.cost || 0
        );

        const quantity = Number(
          item.quantity || 1
        );

        return total + price * quantity;
      },
      0
    );

    const deliveryCharge =
      totalCost > 500 ? 0 : 40;

    return totalCost + deliveryCharge;
  };

  // ======================================================
  // PLACE ORDER
  // ======================================================

  const buyNow = async () => {
    try {
      const totalAmount = calculateTotal();

      console.log(
        "Order total:",
        totalAmount
      );

      const session =
        await createCheckoutSession(
          totalAmount
        );

      const stripe = await stripePromise;

      if (!stripe) {
        console.error(
          "Stripe failed to load"
        );
        return;
      }

      await stripe.redirectToCheckout({
        sessionId: session.id,
      });

    } catch (error) {
      console.error(
        "Checkout error:",
        error
      );
    }
  };

  // ======================================================
  // EMPTY CART
  // ======================================================

  if (!cartItems.length) {
    return <EmptyCart />;
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <Component container spacing={2}>

      {/* ==================================================
          LEFT SIDE
      ================================================== */}

      <LeftComponent
        size={{
          xs: 12,
          sm: 12,
          md: 9,
          lg: 9,
        }}
      >

        <Header>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            My Cart ({cartItems.length})
          </Typography>
        </Header>

        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            removeItemFromCart={
              removeItemFromCart
            }
          />
        ))}

        {/* ==================================================
            PLACE ORDER
        ================================================== */}

        <BottomWrapper>
          <StyledButton
            variant="contained"
            onClick={buyNow}
          >
            Place Order
          </StyledButton>
        </BottomWrapper>

      </LeftComponent>

      {/* ==================================================
          RIGHT SIDE
      ================================================== */}

      <Grid
        size={{
          xs: 12,
          sm: 12,
          md: 3,
          lg: 3,
        }}
      >
        <TotalAmount
          cartItems={cartItems}
        />
      </Grid>

    </Component>
  );
};

export default Cart;