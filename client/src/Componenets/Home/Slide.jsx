import { Box, Button, styled, Divider, Typography } from "@mui/material";
import CarouselModule from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Carousel = CarouselModule.default;

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
  border-radius: 12px;
  overflow: hidden;
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
  background: #1e293b;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  text-transform: none;
  box-shadow: none;

  &:hover {
    background: #334155;
    box-shadow: none;
  }
`;

const ProductBox = styled(Box)`
  padding: 25px 15px;
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
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
            <AccessTimeIcon
              sx={{ fontSize: 20, marginRight: "5px", color: "#1E293B" }}
            />
            <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
          </Timer>
        )}

        <ViewAllButton variant="contained" component={Link} to="/products">
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

              <Text style={{ color: "#0F766E" }}>{product.discount}</Text>

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
