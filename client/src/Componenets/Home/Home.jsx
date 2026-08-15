import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, styled } from "@mui/material";
import { getProducts } from "../../redux/actions/productActions";

// Components
import NavBar from "./NavBar";
import Banner from "./Banner";
import Slide from "./Slide";
import MidSection from "./MidSection";

const Component = styled(Box)`
  padding: 5px 10px;
  background: #f1f5f9;
`;

function Home() {
  const productState = useSelector((state) => state.getProducts);
  const { products } = productState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Component>
        <Banner />
        <Slide products={products} title="Deal of the Day" timer={true} />
        <Slide products={products} title="Top Selections" timer={false} />
        <MidSection />
        <Slide products={products} title="Suggested For You" timer={false} />
        <Slide products={products} title="Interesting finds" timer={false} />
        <Slide products={products} title="Top Deals Accessories" timer={false} />
      </Component>
    </>
  );
}

export default Home;