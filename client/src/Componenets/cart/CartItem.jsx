import {
  Card,
  Box,
  Typography,
  Button,
  styled,
} from "@mui/material";

import { addEllipsis } from "../utils/util";
import GroupButton from "./GroupButton";

const Component = styled(Card)`
  border-top: 1px solid #f0f0f0;
  border-radius: 0px;
  display: flex;
`;

const LeftComponent = styled(Box)`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const SmallText = styled(Typography)`
  color: #878787;
  font-size: 14px;
  margin-top: 10px;
`;

const Cost = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const MRP = styled(Typography)`
  color: #878787;
`;

const Discount = styled(Typography)`
  color: #388e3c;
`;

const Remove = styled(Button)`
  margin-top: 20px;
  font-size: 16px;
`;

const CartItem = ({
  item,
  removeItemFromCart,
}) => {
  const quantity = item?.quantity || 1;

  return (
    <Component>
      {/* LEFT SIDE */}
      <LeftComponent>
        <img
          src={item.url}
          alt={item.title?.shortTitle || "product"}
          style={{
            height: 110,
            width: 110,
            objectFit: "contain",
          }}
        />

        <GroupButton item={item} />
      </LeftComponent>

      {/* RIGHT SIDE */}
      <Box sx={{ margin: 2 }}>
        {/* PRODUCT TITLE */}
        <Typography>
          {addEllipsis(
            item.title?.longTitle ||
              item.title?.shortTitle ||
              "Product"
          )}
        </Typography>

        {/* SELLER */}
        <SmallText>
          Seller: RetailNet
        </SmallText>

        {/* PRICE */}
        <Typography sx={{ margin: "20px 0" }}>
          <Cost component="span">
            ₹
            {(
              Number(item.price?.cost || 0) *
              quantity
            ).toLocaleString("en-IN")}
          </Cost>

          &nbsp;&nbsp;&nbsp;

          {/* MRP */}
          <MRP component="span">
            <strike>
              ₹
              {(
                Number(item.price?.mrp || 0) *
                quantity
              ).toLocaleString("en-IN")}
            </strike>
          </MRP>

          &nbsp;&nbsp;&nbsp;

          {/* DISCOUNT */}
          <Discount component="span">
            {item.price?.discount}
          </Discount>
        </Typography>

        {/* REMOVE */}
        <Remove
          onClick={() =>
            removeItemFromCart(item.id)
          }
        >
          Remove
        </Remove>
      </Box>
    </Component>
  );
};

export default CartItem;