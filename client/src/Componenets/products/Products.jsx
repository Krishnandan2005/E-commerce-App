import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts } from "../../redux/actions/productActions";

const Container = styled(Box)`
  padding: 20px;
  background: #f1f5f9;
  min-height: calc(100vh - 54px);
`;

const Header = styled(Box)`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #ddd;
`;

const ProductGrid = styled(Box)`
  background: #ffffff;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProductBox = styled(Box)`
  padding: 20px 10px;
  text-align: center;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled("img")({
  width: "100%",
  height: "180px",
  objectFit: "contain",
});

const ProductTitle = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
`;

const ProductDiscount = styled(Typography)`
  font-size: 14px;
  color: #0f766e;
  margin-top: 8px;
`;

const ProductTagline = styled(Typography)`
  font-size: 14px;
  color: #777;
  margin-top: 8px;
`;

function Products() {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const productState = useSelector((state) => state.getProducts);
  const { products = [], loading } = productState;

  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  const filteredProducts = category
    ? products.filter(
        (product) =>
          product.category?.toLowerCase() === category.toLowerCase()
      )
    : products;

  return (
    <Container>
      <Header>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          {category || "All Products"}
        </Typography>

        <Typography
          sx={{
            color: "#878787",
            marginTop: "5px",
            fontSize: 14,
          }}
        >
          {category
            ? `Explore ${category} products`
            : "Explore all our products"}
        </Typography>
      </Header>

      {loading ? (
        <Box
          sx={{
            background: "#fff",
            padding: 5,
            textAlign: "center",
          }}
        >
          <Typography>Loading products...</Typography>
        </Box>
      ) : filteredProducts.length === 0 ? (
        <Box
          sx={{
            background: "#fff",
            padding: 5,
            textAlign: "center",
          }}
        >
          <Typography>
            No products found in {category} category.
          </Typography>
        </Box>
      ) : (
        <ProductGrid>
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ProductBox>
                <Image
                  src={product.url}
                  alt={product.title?.shortTitle || "product"}
                />

                <ProductTitle>
                  {product.title?.shortTitle}
                </ProductTitle>

                <ProductDiscount>
                  {product.discount}
                </ProductDiscount>

                <ProductTagline>
                  {product.tagline}
                </ProductTagline>
              </ProductBox>
            </Link>
          ))}
        </ProductGrid>
      )}
    </Container>
  );
}

export default Products;