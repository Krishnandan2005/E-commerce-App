import {
  Box,
  Typography,
  styled,
} from "@mui/material";

const Container = styled(Box)`
  background: #fff;
  padding: 20px;
`;

const Heading = styled(Typography)`
  color: #878787;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
`;

const PriceRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const TotalRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 20px 0;
  border-top: 1px dashed #ddd;
  border-bottom: 1px dashed #ddd;
`;

const Savings = styled(Typography)`
  color: #388e3c;
  font-weight: 600;
  margin-top: 20px;
`;

const TotalAmount = ({ cartItems = [] }) => {

  // ==================================================
  // TOTAL MRP
  // ==================================================

  const totalMRP = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price?.mrp || 0) *
        Number(item.quantity || 1),
    0
  );

  // ==================================================
  // TOTAL PRODUCT PRICE
  // ==================================================

  const totalCost = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price?.cost || 0) *
        Number(item.quantity || 1),
    0
  );

  // ==================================================
  // DISCOUNT
  // ==================================================

  const totalDiscount = totalMRP - totalCost;

  // ==================================================
  // DELIVERY
  // ==================================================

  const deliveryCharge = totalCost > 500 ? 0 : 40;

  // ==================================================
  // FINAL TOTAL
  // ==================================================

  const totalAmount =
    totalCost + deliveryCharge;

  return (
    <Container>

      <Heading>
        PRICE DETAILS
      </Heading>

      {/* PRICE */}

      <PriceRow>
        <Typography>
          Price
        </Typography>

        <Typography>
          ₹{totalMRP}
        </Typography>
      </PriceRow>

      {/* DISCOUNT */}

      <PriceRow>
        <Typography>
          Discount
        </Typography>

        <Typography sx={{ color: "#388e3c" }}>
          - ₹{totalDiscount}
        </Typography>
      </PriceRow>

      {/* DELIVERY */}

      <PriceRow>
        <Typography>
          Delivery Charges
        </Typography>

        <Typography
          sx={{
            color:
              deliveryCharge === 0
                ? "#388e3c"
                : "#212121",
          }}
        >
          {deliveryCharge === 0
            ? "FREE"
            : `₹${deliveryCharge}`}
        </Typography>
      </PriceRow>

      {/* TOTAL */}

      <TotalRow>

        <Typography fontWeight={600}>
          Total Amount
        </Typography>

        <Typography fontWeight={600}>
          ₹{totalAmount}
        </Typography>

      </TotalRow>

      {/* SAVINGS */}

      <Savings>
        You will save ₹{totalDiscount}
      </Savings>

    </Container>
  );
};

export default TotalAmount;