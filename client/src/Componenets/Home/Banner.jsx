import React from "react";
import { Box, Typography, styled } from "@mui/material";
import CarouselModule from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerContent } from "../../Constants/data";

const Carousel = CarouselModule.default;

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 600 }, items: 1 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
};

const Slide = styled(Box)(({ theme, image }) => ({
  width: "100%",
  height: 480,
  position: "relative",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",

  [theme.breakpoints.down("lg")]: { height: 400 },
  [theme.breakpoints.down("md")]: { height: 340 },
  [theme.breakpoints.down("sm")]: { height: 260, backgroundPosition: "60% center" },
  "@media (max-width:380px)": { height: 220 },
}));

const Overlay = styled(Box)(({ bg }) => ({
  position: "absolute",
  inset: 0,
  background: bg,
}));

const Content = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  padding: "0 60px",

  [theme.breakpoints.down("lg")]: { padding: "0 40px" },
  [theme.breakpoints.down("md")]: { padding: "0 28px" },
  [theme.breakpoints.down("sm")]: { padding: "0 18px" },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: "#FFE500",
  fontWeight: 600,
  fontSize: "1.1rem",

  [theme.breakpoints.down("sm")]: { fontSize: "0.85rem" },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  fontWeight: 800,
  fontSize: "2rem",
  marginBottom: 8,
  maxWidth: "60%",
  lineHeight: 1.2,

  [theme.breakpoints.down("lg")]: { fontSize: "1.6rem" },
  [theme.breakpoints.down("md")]: { fontSize: "1.3rem", maxWidth: "70%" },
  [theme.breakpoints.down("sm")]: { fontSize: "1.05rem", maxWidth: "85%" },
  "@media (max-width:380px)": { fontSize: "0.9rem" },
}));

const Price = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  fontSize: "1rem",
  marginTop: 12,
  opacity: 0.9,

  [theme.breakpoints.down("sm")]: { fontSize: "0.8rem", marginTop: 6 },
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
      {bannerContent.map((data, i) => (
        <Slide key={i} image={data.image}>
          <Overlay bg={data.overlay} />
          <Content>
            <Subtitle>{data.subtitle}</Subtitle>
            <Title>{data.title}</Title>
            <Price>{data.price}</Price>
          </Content>
        </Slide>
      ))}
    </Carousel>
  );
}

export default Banner;