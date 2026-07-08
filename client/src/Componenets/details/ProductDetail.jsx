import React from "react";
import {
  Box,
  Typography,
  styled,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { LocalOffer as Badge } from "@mui/icons-material";

const fassured =
  "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

const adURL =
  "https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50";

const SmallText = styled(Box)`
  font-size: 14px;
  vertical-align: baseline;

  & > p {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const StyledBadge = styled(Badge)`
  margin-right: 10px;
  color: #00cc00;
  font-size: 18px;
`;

const ColumnText = styled(TableRow)`
  & > td {
    font-size: 14px;
    border: none;
  }
`;

function ProductDetail({ product }) {
  // Prevent rendering until data is available
  if (!product || !product.title || !product.price) {
    return <Typography>Loading...</Typography>;
  }

  const date = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

  return (
    <>
      <Typography variant="h6">
        {product.title.longTitle}
      </Typography>

      <Typography
        sx={{ mt: 1, color: "#878787", fontSize: 14 }}
      >
        8 Ratings & 2 Reviews
        <Box component="span">
          <img
            src={fassured}
            alt="Flipkart Assured"
            style={{ width: 77, marginLeft: 20 }}
          />
        </Box>
      </Typography>

      <Typography sx={{ my: 2 }}>
        <span style={{ fontSize: 28 }}>
          ₹{product.price.cost}
        </span>

        <span
          style={{
            marginLeft: 12,
            color: "#878787",
          }}
        >
          <strike>₹{product.price.mrp}</strike>
        </span>

        <span
          style={{
            marginLeft: 12,
            color: "#388E3C",
            fontWeight: 600,
          }}
        >
          {product.price.discount} off
        </span>
      </Typography>

      <Typography sx={{ fontWeight: 600 }}>
        Available Offers
      </Typography>

      <SmallText>
        <Typography>
          <StyledBadge />
          Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card
        </Typography>

        <Typography>
          <StyledBadge />
          Bank Offer 10% Off on Bank of Baroda Mastercard Debit Card
        </Typography>

        <Typography>
          <StyledBadge />
          Extra ₹500 Off on Select Appliances
        </Typography>

        <Typography>
          <StyledBadge />
          Partner Offer: Extra 10% Off up to ₹500
        </Typography>
      </SmallText>

      <Table>
        <TableBody>
          <ColumnText>
            <TableCell sx={{ color: "#878787", width: 120 }}>
              Delivery
            </TableCell>
            <TableCell>
              Delivery by {date.toDateString()} | ₹40
            </TableCell>
          </ColumnText>

          <ColumnText>
            <TableCell sx={{ color: "#878787" }}>
              Warranty
            </TableCell>
            <TableCell>No Warranty</TableCell>
          </ColumnText>

          <ColumnText>
            <TableCell sx={{ color: "#878787" }}>
              Seller
            </TableCell>

            <TableCell>
              <Typography sx={{ color: "#2874f0", fontWeight: 600 }}>
                SuperComNet
              </Typography>

              <Typography>
                GST Invoice Available
              </Typography>

              <Typography>
                View more sellers starting from ₹
                {product.price.cost}
              </Typography>
            </TableCell>
          </ColumnText>

          <TableRow>
            <TableCell colSpan={2}>
              <img
                src={adURL}
                alt="Advertisement"
                style={{ width: 390 }}
              />
            </TableCell>
          </TableRow>

          <ColumnText>
            <TableCell sx={{ color: "#878787" }}>
              Description
            </TableCell>

            <TableCell>
              {product.description}
            </TableCell>
          </ColumnText>
        </TableBody>
      </Table>
    </>
  );
}

export default ProductDetail;