import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";

const ImageURL = [
  "https://rukminim1.flixcart.com/flap/960/960/image/2f30db9425df5cec.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/960/960/image/084789479074d2b2.jpg",
  "https://rukminim1.flixcart.com/flap/960/960/image/1ce0c4c1fb501b45.jpg?q=50",
];

const Wrapper = styled(Grid)(({ theme }) => ({
  marginTop: 5,
}));



const MidSection = () => {
  return (
    <Wrapper container spacing={2}>
      {ImageURL.map((image, index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 12,
            md: 4,
            lg: 4,
          }}
        >
          <img src={image} style={{ width: '100%' }} />
        </Grid>
      ))}
    </Wrapper>
  );
};

export default MidSection;