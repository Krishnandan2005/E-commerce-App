import {
  Badge,
  Box,
  Button,
  Typography,
  styled,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext, useState } from "react";

import { DataContext } from "../../context/DataProvider";
import LoginDialog from "../Login/LoginDialog";
import Profile from "./Profile";
import { useSelector } from "react-redux";

const Wrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDrawer",
})(({ theme, isDrawer }) => ({
  display: "flex",
  alignItems: isDrawer ? "flex-start" : "center",
  flexDirection: isDrawer ? "column" : "row",
  gap: isDrawer ? "20px" : "24px",
  margin: isDrawer ? "20px" : "0 3%",

  ...(!isDrawer && {
    [theme.breakpoints.down("md")]: {
      gap: "12px",
      marginLeft: "auto",
    },
  }),
}));

const LoginButton = styled(Button)({
  color: "#1E293B",
  background: "#FFE500",
  textTransform: "none",
  fontWeight: 700,
  padding: "4px 32px",
  boxShadow: "none",

  "&:hover": {
    background: "#FFD700",
    boxShadow: "none",
  },
});

const NavText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isDrawer",
})(({ theme, isDrawer }) => ({
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  color: isDrawer ? "#000" : "#fff",
  whiteSpace: "nowrap",

  ...(!isDrawer && {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }),
}));

const IconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDrawer",
})(({ isDrawer }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: isDrawer ? "#000" : "#fff",
  cursor: "pointer",
}));

const CustomButtons = ({ isDrawer = false }) => {
  const [open, setOpen] = useState(false);
  const { account, setAccount } = useContext(DataContext);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <Wrapper isDrawer={isDrawer}>
        {account ? (
          <Profile account={account} setAccount={setAccount} />
        ) : (
          <LoginButton variant="contained" onClick={() => setOpen(true)}>
            Login
          </LoginButton>
        )}

        <NavText isDrawer={isDrawer}>Become a Seller</NavText>

        <IconContainer isDrawer={isDrawer}>
          <ExpandMoreIcon sx={{ color: isDrawer ? "#000" : "#fff" }} />
          <NavText isDrawer={isDrawer}>More</NavText>
        </IconContainer>

        <IconContainer isDrawer={isDrawer}>
          <Badge badgeContent={cartItems?.length} color="secondary">
            <ShoppingCartIcon sx={{ color: isDrawer ? "#000" : "#fff" }} />
          </Badge>
          <NavText isDrawer={isDrawer} style={{ marginLeft: 10 }}>
            Cart
          </NavText>
        </IconContainer>
      </Wrapper>

      <LoginDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default CustomButtons;