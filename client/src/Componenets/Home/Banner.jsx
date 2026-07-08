import React from "react";
import { styled } from "@mui/material";
import CarouselModule from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "../../Constants/data";

const Carousel = CarouselModule.default;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: 280,
  objectFit: "cover",

  [theme.breakpoints.down("md")]: {
    height: 220,
  },

  [theme.breakpoints.down("sm")]: {
    height: 160,
  },
}));

function Banner() {
  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={3000}
      swipeable
      draggable
      keyBoardControl
      showDots
    >
      {bannerData.map((data) => (
        <Image
          key={data.url}
          src={data.url}
          alt="banner"
        />
      ))}
    </Carousel>
  );
}

export default Banner;