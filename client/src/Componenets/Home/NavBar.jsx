import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { navData } from "../../Constants/data";

const Component = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  margin: "55px 130px 0 130px",
  overflowX: "auto",
  

  [theme.breakpoints.down("lg")]: {
    margin: "0px",
  },
}));

const Container = styled(Box)`
  padding: 12px 8px;
  text-align: center;
`;

const Text = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
`;

const NavBar = () => {
  return (
    <Box style={{background: '#fff'}}>
    <Component>
      {navData.map((item) => (
        <Container key={item.text}>
          <img
            src={item.url}
            alt={item.text}
            style={{ width: 64 }}
          />
          <Text>{item.text}</Text>
        </Container>
      ))}
    </Component>
    </Box>
  );
};

export default NavBar;