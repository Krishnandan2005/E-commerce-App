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
  if (!product || !product.title || !product.price) {
    return <Typography>Loading...</Typography>;
  }

  const date = new Date(
    Date.now() + 5 * 24 * 60 * 60 * 1000
  );

  return (
    <>
      {/* PRODUCT TITLE */}
      <Typography variant="h6">
        {product.title.longTitle}
      </Typography>

      {/* RATINGS */}
      <Typography
        sx={{
          mt: 1,
          color: "#878787",
          fontSize: 14,
        }}
      >
        8 Ratings & 2 Reviews
      </Typography>

      {/* PRICE */}
      <Typography sx={{ my: 2 }}>
        <span style={{ fontSize: 28 }}>
          ₹{Number(product.price.cost).toLocaleString("en-IN")}
        </span>

        <span
          style={{
            marginLeft: 12,
            color: "#878787",
          }}
        >
          <strike>
            ₹{Number(product.price.mrp).toLocaleString("en-IN")}
          </strike>
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

      {/* AVAILABLE OFFERS */}
      <Typography sx={{ fontWeight: 600 }}>
        Available Offers
      </Typography>

      <SmallText>
        <Typography>
          <StyledBadge />
          Special discount available on this product
        </Typography>

        <Typography>
          <StyledBadge />
          Get additional savings on selected payment methods
        </Typography>

        <Typography>
          <StyledBadge />
          Free delivery available on eligible orders
        </Typography>

        <Typography>
          <StyledBadge />
          Extra savings available on selected products
        </Typography>
      </SmallText>

      {/* PRODUCT INFORMATION */}
      <Table>
        <TableBody>

          {/* DELIVERY */}
          <ColumnText>
            <TableCell
              sx={{
                color: "#878787",
                width: 120,
              }}
            >
              Delivery
            </TableCell>

            <TableCell>
              Delivery by {date.toDateString()} | ₹40
            </TableCell>
          </ColumnText>

          {/* WARRANTY */}
          <ColumnText>
            <TableCell sx={{ color: "#878787" }}>
              Warranty
            </TableCell>

            <TableCell>
              No Warranty
            </TableCell>
          </ColumnText>

          {/* SELLER */}
          <ColumnText>
            <TableCell sx={{ color: "#878787" }}>
              Seller
            </TableCell>

            <TableCell>
              <Typography
                sx={{
                  color: "#2874f0",
                  fontWeight: 600,
                }}
              >
                QuickCart247 Seller
              </Typography>

              <Typography>
                GST Invoice Available
              </Typography>

              <Typography>
                Genuine product guaranteed
              </Typography>
            </TableCell>
          </ColumnText>

          {/* DESCRIPTION */}
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