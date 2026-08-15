import Grid from "@mui/material/Grid";
import { styled, Box, Typography } from "@mui/material";

const midSectionData = [
  {
    tag: "Fresh Picks",
    title: "Save on Groceries",
    subtitle: "From ₹49",
    accent: "#0F766E",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop",
  },
  {
    tag: "Home & Living",
    title: "Home Essentials",
    subtitle: "Starting ₹499",
    accent: "#B45309",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
  },
  {
    tag: "Big Savings",
    title: "Deals on Appliances",
    subtitle: "Up to 40% Off",
    accent: "#4C3FE0",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop",
  },
];

const Wrapper = styled(Grid)(({ theme }) => ({
  marginTop: 5,
}));

const Tile = styled(Box)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 280px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
  }

  &:hover .tile-image {
    transform: scale(1.06);
  }
`;

const TileImage = styled(Box)`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.4s ease;
`;

const TileOverlay = styled(Box)`
  position: relative;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.35) 55%, transparent 100%);
`;

const TagBadge = styled(Typography)`
  display: inline-block;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const TileTitle = styled(Typography)`
  color: #ffffff;
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 4px;
`;

const TileSubtitle = styled(Typography)`
  color: #ffe500;
  font-weight: 600;
  font-size: 0.95rem;
`;

const MidSection = () => {
  return (
    <Wrapper container spacing={2}>
      {midSectionData.map((item, index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 12,
            md: 4,
            lg: 4,
          }}
        >
          <Tile>
            <TileImage className="tile-image" style={{ backgroundImage: `url(${item.image})` }} />
            <TileOverlay>
              <TagBadge style={{ background: item.accent }}>{item.tag}</TagBadge>
              <TileTitle>{item.title}</TileTitle>
              <TileSubtitle>{item.subtitle}</TileSubtitle>
            </TileOverlay>
          </Tile>
        </Grid>
      ))}
    </Wrapper>
  );
};

export default MidSection;