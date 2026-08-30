import {
  Badge,
  Box,
  Button,
  Typography,
  styled,
  Menu,
  MenuItem,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";
import LoginDialog from "../Login/LoginDialog";
import Profile from "./Profile";

import { useSelector } from "react-redux";

// ======================================================
// WRAPPER
// ======================================================

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

// ======================================================
// LOGIN BUTTON
// ======================================================

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

// ======================================================
// NAV TEXT
// ======================================================

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

// ======================================================
// ICON CONTAINER
// ======================================================

const IconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDrawer",
})(({ isDrawer }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: isDrawer ? "#000" : "#fff",
  cursor: "pointer",
}));

// ======================================================
// CUSTOM BUTTONS
// ======================================================

const CustomButtons = ({
  isDrawer = false,
  sellerMode = false,
}) => {
  const [open, setOpen] = useState(false);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);

  const { account, setAccount } = useContext(DataContext);

  const { cartItems } = useSelector(
    (state) => state.cart
  );

  const navigate = useNavigate();

  // ======================================================
  // SELLER
  // ======================================================

  const seller = JSON.parse(
    localStorage.getItem("seller")
  );

  // ======================================================
  // MORE MENU
  // ======================================================

  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  // ======================================================
  // BECOME SELLER
  // ======================================================

  const handleBecomeSeller = () => {
    handleMoreClose();
    navigate("/seller");
  };

  // ======================================================
  // SELLER DASHBOARD
  // ======================================================

  const handleSellerDashboard = () => {
    handleMoreClose();
    navigate("/seller/dashboard");
  };

  // ======================================================
  // ADD PRODUCT
  // ======================================================

  const handleAddProduct = () => {
    handleMoreClose();
    navigate("/seller/add-product");
  };

  // ======================================================
  // MANAGE PRODUCTS
  // ======================================================

  const handleManageProducts = () => {
    handleMoreClose();
    navigate("/seller/products");
  };

  // ======================================================
  // SELLER LOGOUT
  // ======================================================

  const handleSellerLogout = () => {
    handleMoreClose();

    localStorage.removeItem("seller");

    navigate("/seller");
  };

  const moreOpen = Boolean(moreAnchorEl);

  return (
    <>
      <Wrapper isDrawer={isDrawer}>

        {/* ================================================== */}
        {/* NORMAL USER MODE */}
        {/* ================================================== */}

        {!sellerMode && (
          <>
            {/* USER LOGIN / PROFILE */}

            {account ? (
              <Profile
                account={account}
                setAccount={setAccount}
              />
            ) : (
              <LoginButton
                variant="contained"
                onClick={() => setOpen(true)}
              >
                Login
              </LoginButton>
            )}

            {/* ================================================== */}
            {/* MORE */}
            {/* ================================================== */}

            <IconContainer
              isDrawer={isDrawer}
              onClick={handleMoreClick}
              aria-controls={
                moreOpen ? "more-menu" : undefined
              }
              aria-haspopup="true"
              aria-expanded={
                moreOpen ? "true" : undefined
              }
            >
              <NavText isDrawer={isDrawer}>
                More
              </NavText>

              <ExpandMoreIcon
                sx={{
                  color: isDrawer
                    ? "#000"
                    : "#fff",
                  fontSize: 22,
                }}
              />
            </IconContainer>

            {/* ================================================== */}
            {/* MORE MENU */}
            {/* ================================================== */}

            <Menu
              id="more-menu"
              anchorEl={moreAnchorEl}
              open={moreOpen}
              onClose={handleMoreClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem
                onClick={handleBecomeSeller}
              >
                Become a Seller
              </MenuItem>

              <MenuItem
                onClick={handleMoreClose}
              >
                Help Center
              </MenuItem>

              <MenuItem
                onClick={handleMoreClose}
              >
                Notifications
              </MenuItem>
            </Menu>
          </>
        )}

        {/* ================================================== */}
        {/* SELLER MODE */}
        {/* ================================================== */}

        {sellerMode && seller && (
          <>
            {/* SELLER NAME */}

            <NavText isDrawer={isDrawer}>
              {seller.firstname || "Seller"}
            </NavText>

            {/* SELLER MENU */}

            <IconContainer
              isDrawer={isDrawer}
              onClick={handleMoreClick}
              aria-controls={
                moreOpen
                  ? "seller-menu"
                  : undefined
              }
              aria-haspopup="true"
              aria-expanded={
                moreOpen ? "true" : undefined
              }
            >
              <NavText isDrawer={isDrawer}>
                Seller
              </NavText>

              <ExpandMoreIcon
                sx={{
                  color: isDrawer
                    ? "#000"
                    : "#fff",
                  fontSize: 22,
                }}
              />
            </IconContainer>

            {/* ================================================== */}
            {/* SELLER MENU */}
            {/* ================================================== */}

            <Menu
              id="seller-menu"
              anchorEl={moreAnchorEl}
              open={moreOpen}
              onClose={handleMoreClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem
                onClick={handleSellerDashboard}
              >
                Dashboard
              </MenuItem>

              <MenuItem
                onClick={handleAddProduct}
              >
                Add Product
              </MenuItem>

              <MenuItem
                onClick={handleManageProducts}
              >
                Manage Products
              </MenuItem>

              <MenuItem
                onClick={handleSellerLogout}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}

        {/* ================================================== */}
        {/* CART */}
        {/* ================================================== */}

        {!sellerMode && (
          <IconContainer
            isDrawer={isDrawer}
            onClick={() => navigate("/cart")}
          >
            <Badge
              badgeContent={
                cartItems?.length || 0
              }
              color="secondary"
            >
              <ShoppingCartIcon
                sx={{
                  color: isDrawer
                    ? "#000"
                    : "#fff",
                }}
              />
            </Badge>

            <NavText
              isDrawer={isDrawer}
              style={{
                marginLeft: 10,
              }}
            >
              Cart
            </NavText>
          </IconContainer>
        )}

      </Wrapper>

      {/* ================================================== */}
      {/* USER LOGIN DIALOG */}
      {/* ================================================== */}

      {!sellerMode && (
        <LoginDialog
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default CustomButtons;