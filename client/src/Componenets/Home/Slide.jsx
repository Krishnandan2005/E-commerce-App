import { Box, Button, styled, Divider, Typography } from "@mui/material";
import CarouselModule from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

const Carousel = CarouselModule.default;

const timerURL =
  "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Component = styled(Box)`
  margin-top: 5px;
  background: #ffffff;
`;

const Deal = styled(Box)`
  padding: 15px 20px;
  display: flex;
  align-items: center;
`;

const Timer = styled(Box)`
  display: flex;
  margin-left: 10px;
  align-items: center;
  font-weight: 600;
  color: #7f7f7f;
`;

const ViewAllButton = styled(Button)`
  margin-left: auto;
  background: #2874f0;
  border-radius: 2px;
  font-weight: 600;
  font-size: 14px;
  text-transform: none;
`;

const ProductBox = styled(Box)`
  padding: 25px 15px;
  text-align: center;
`;

const Image = styled("img")({
  width: "auto",
  height: "150px",
  objectFit: "contain",
});

const Text = styled(Typography)`
  font-size: 14px;
  margin-top: 8px;
`;

const Slide = ({ products = [], title, timer }) => {
  const renderer = ({ hours, minutes, seconds }) => (
    <span>
      {hours}:{minutes}:{seconds} Left
    </span>
  );

  return (
    <Component>
      <Deal>
        <Typography
          style={{
            fontWeight: 600,
            fontSize: 18,
            marginRight: 12,
          }}
        >
          {title}
        </Typography>

        {timer && (
          <Timer>
            <img
              src={timerURL}
              alt="timer"
              style={{ width: 24, marginRight: 5 }}
            />
            <Countdown
              date={Date.now() + 5.04e7}
              renderer={renderer}
            />
          </Timer>
        )}

        <ViewAllButton variant="contained">
          View All
        </ViewAllButton>
      </Deal>

      <Divider />

      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={4000}
        swipeable
        draggable
        keyBoardControl
        showDots={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {products.map((product) => (
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

              <Text style={{ fontWeight: 600 }}>
                {product.title?.shortTitle}
              </Text>

              <Text style={{ color: "green" }}>
                {product.discount}
              </Text>

              <Text style={{ color: "#212121", opacity: 0.6 }}>
                {product.tagline}
              </Text>
            </ProductBox>
          </Link>
        ))}
      </Carousel>
    </Component>
  );
};

export default Slide;