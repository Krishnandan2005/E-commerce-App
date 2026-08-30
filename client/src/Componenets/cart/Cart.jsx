import { useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  styled,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import {
  createOrder,
  createCheckoutSession,
} from "../../service/api";

import { useSelector, useDispatch } from "react-redux";

import {
  addToCart,
  removeFromCart,
} from "../../redux/actions/cartActions";

import { DataContext } from "../../context/DataProvider";

import TotalAmount from "./TotalAmount";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";

// ======================================================
// STYLES
// ======================================================

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

// ======================================================
// STRIPE
// ======================================================

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

// ======================================================
// CART
// ======================================================

const Cart = () => {
  const { cartItems } = useSelector(
    (state) => state.cart
  );

  const { account } = useContext(DataContext);

  const { id } = useParams();

  const dispatch = useDispatch();

  // ======================================================
  // ADD PRODUCT FROM PRODUCT URL
  // ======================================================

  useEffect(() => {
    if (
      id &&
      !cartItems.some(
        (item) => item.id === id
      )
    ) {
      dispatch(addToCart(id, 1));
    }
  }, [
    dispatch,
    id,
    cartItems,
  ]);

  // ======================================================
  // REMOVE ITEM
  // ======================================================

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  // ======================================================
  // CALCULATE TOTAL
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

        return (
          total +
          price * quantity
        );
      },
      0
    );

    // Free delivery above ₹500
    const deliveryCharge =
      totalCost > 500 ? 0 : 40;

    return (
      totalCost +
      deliveryCharge
    );
  };

  // ======================================================
  // PLACE ORDER
  // ======================================================

  const buyNow = async () => {
    try {
      // --------------------------------------------------
      // CHECK LOGIN
      // --------------------------------------------------

      if (!account?._id) {
        alert(
          "Please login before placing an order."
        );
        return;
      }

      // --------------------------------------------------
      // CHECK CART
      // --------------------------------------------------

      if (!cartItems.length) {
        alert("Your cart is empty.");
        return;
      }

      // --------------------------------------------------
      // CALCULATE TOTAL
      // --------------------------------------------------

      const totalAmount =
        calculateTotal();

      if (totalAmount <= 0) {
        alert("Invalid order amount.");
        return;
      }

      // --------------------------------------------------
      // PREPARE PRODUCTS
      // --------------------------------------------------

      const products =
        cartItems.map((item) => ({
          productId: item.id,

          title:
            item.title?.longTitle ||
            item.title?.shortTitle ||
            "Product",

          image:
            item.detailUrl ||
            item.url ||
            "",

          quantity:
            Number(
              item.quantity || 1
            ),

          price:
            Number(
              item.price?.cost || 0
            ),

          mrp:
            Number(
              item.price?.mrp || 0
            ),
        }));

      // --------------------------------------------------
      // VALIDATE PRODUCTS
      // --------------------------------------------------

      if (!products.length) {
        alert(
          "No products found in cart."
        );
        return;
      }

      // --------------------------------------------------
      // STEP 1:
      // CREATE ORDER IN MONGODB
      // --------------------------------------------------

      const orderData = {
        userId: account._id,

        products,

        totalAmount,

        paymentStatus: "Pending",

        orderStatus: "Processing",
      };

      console.log(
        "Creating order in MongoDB:",
        orderData
      );

      const orderResponse =
        await createOrder(
          orderData
        );

      console.log(
        "MongoDB Order Response:",
        orderResponse
      );

      // --------------------------------------------------
      // GET CREATED ORDER ID
      // --------------------------------------------------

      const orderId =
        orderResponse?.order?.orderId;

      if (!orderId) {
        console.error(
          "Order ID was not returned by backend."
        );

        alert(
          "Unable to create order."
        );

        return;
      }

      console.log(
        "MongoDB Order Created:",
        orderId
      );

      // --------------------------------------------------
      // STEP 2:
      // CREATE STRIPE CHECKOUT SESSION
      // --------------------------------------------------

      const checkoutData = {
        userId: account._id,

        products,

        totalAmount,

        orderId,
      };

      console.log(
        "Creating Stripe session:",
        checkoutData
      );

      const session =
        await createCheckoutSession(
          checkoutData
        );

      console.log(
        "Stripe Session:",
        session
      );

      // --------------------------------------------------
      // CHECK SESSION
      // --------------------------------------------------

      if (!session?.id) {
        console.error(
          "Stripe session ID missing."
        );

        alert(
          "Order was created, but payment session could not be created."
        );

        return;
      }

      // --------------------------------------------------
      // STEP 3:
      // LOAD STRIPE
      // --------------------------------------------------

      const stripe =
        await stripePromise;

      if (!stripe) {
        console.error(
          "Stripe failed to load."
        );

        alert(
          "Unable to load payment gateway."
        );

        return;
      }

      // --------------------------------------------------
      // STEP 4:
      // REDIRECT TO STRIPE
      // --------------------------------------------------

      const result =
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });

      if (result?.error) {
        console.error(
          "Stripe redirect error:",
          result.error
        );

        alert(
          result.error.message ||
            "Unable to open payment gateway."
        );
      }

    } catch (error) {
      console.error(
        "Place Order Error:",
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

        alert(
          error.response.data?.message ||
            "Unable to place order."
        );
      } else {
        alert(
          "Something went wrong while placing the order."
        );
      }
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
    <Component
      container
      spacing={2}
    >
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
        {/* CART HEADER */}

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

        {/* CART ITEMS */}

        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            removeItemFromCart={
              removeItemFromCart
            }
          />
        ))}

        {/* PLACE ORDER */}

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