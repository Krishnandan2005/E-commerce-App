import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import Grid from "@mui/material/Grid";

import { getProductDetails } from "../../redux/actions/productActions";
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";

const Component = styled(Box)`
  background: #f2f2f2;
  margin-top: 55px;
  min-height: 100vh;
`;

const Container = styled(Grid)`
  background: #ffffff;
  padding: 20px;
`;

const RightContainer = styled(Box)`
  padding: 0 24px;
`;

function DetailedView() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, product } = useSelector(
    (state) => state.getProductDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <Component>
        <Typography sx={{ p: 2 }}>Loading...</Typography>
      </Component>
    );
  }

  if (!product || Object.keys(product).length === 0) {
    return (
      <Component>
        <Typography sx={{ p: 2 }}>Product not found.</Typography>
      </Component>
    );
  }

  return (
    <Component>
      <Container container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ActionItem product={product} />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <RightContainer>
            <ProductDetail product={product} />
          </RightContainer>
        </Grid>
      </Container>
    </Component>
  );
}

export default DetailedView;