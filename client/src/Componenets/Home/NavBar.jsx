import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { navData } from "../../Constants/data";
import { Link } from "react-router-dom";

const Component = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  margin: "55px 130px 0 130px",
  overflowX: "auto",
  paddingBottom: "8px",

  [theme.breakpoints.down("lg")]: {
    margin: "0px",
    padding: "0 12px 8px 12px",
  },

  "&::-webkit-scrollbar": {
    height: "4px",
  },

  "&::-webkit-scrollbar-thumb": {
    background: "#e2e8f0",
    borderRadius: "4px",
  },
}));

const Container = styled(Box)`
  padding: 14px 12px;
  text-align: center;
  cursor: pointer;
  border-radius: 12px;
  transition: transform 0.2s ease, background 0.2s ease;
  min-width: 88px;

  &:hover {
    background: #f8fafc;
    transform: translateY(-3px);
  }

  &:hover .icon-wrapper {
    background: #ffe500;
    box-shadow: 0 4px 12px rgba(255, 229, 0, 0.35);
  }

  &:hover .icon-wrapper svg {
    color: #1e293b;
  }
`;

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: 0 auto 8px auto;
  border-radius: 50%;
  background: #f1f5f9;
  transition: background 0.2s ease, box-shadow 0.2s ease;
`;

const Text = styled(Typography)`
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  color: #1e293b;
  white-space: nowrap;
`;

const NavBar = () => {
  return (
    <Box style={{ background: "#fff" }}>
      <Component>
        {navData.map((item) => {
          const Icon = item.icon;

          return (
            <Container
              key={item.text}
              component={Link}
              to={`/products?category=${encodeURIComponent(item.text)}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <IconWrapper className="icon-wrapper">
                <Icon sx={{ fontSize: 30, color: "#1E293B" }} />
              </IconWrapper>

              <Text>{item.text}</Text>
            </Container>
          );
        })}
      </Component>
    </Box>
  );
};

export default NavBar;