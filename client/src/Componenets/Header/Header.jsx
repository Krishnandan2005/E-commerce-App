import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  styled,
  Drawer,
  IconButton,
} from "@mui/material";
import Search from "./Search";
import CustomButtons from "./CustomButtons";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";

const StyledHeader = styled(AppBar)`
  background: #2874f0;
  height: 55px;
  box-shadow: none;
`;

const StyledToolbar = styled(Toolbar)`
  min-height: 56px !important;
  padding: 0 16px !important;
  display: flex;
  align-items: center;
`;

const LogoContainer = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "12%",
  marginRight: "8px",
  textDecoration: "none",
  gap: "8px",

  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
  },
}));

const LogoIconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #ffe500;
`;

const StyledCartIcon = styled(ShoppingCartIcon)`
  color: #2874f0;
  font-size: 20px;
`;

const LogoTextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1;
`;

const LogoText = styled(Typography)`
  font-size: 19px;
  font-weight: 800;
  font-style: italic;
  letter-spacing: 0.3px;
  line-height: 1;
  white-space: nowrap;

  & span {
    color: #ffe500;
  }
`;

const SubHeading = styled(Typography)`
  display: flex;
  align-items: center;
  font-size: 11px;
  font-style: italic;
  color: #ffffff;
  margin-top: 3px;
  opacity: 0.9;
`;

const PlusText = styled("span")`
  color: #ffe500;
  font-weight: 500;
  margin-left: 2px;
`;

const CustomButtonWrapper = styled(Box)(({ theme }) => ({
  margin: "0 5px 0 12px",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  color: "#fff",

  [theme.breakpoints.down("md")]: {
    display: "block",
    marginRight: theme.spacing(1),
  },
}));

const DrawerWrapper = styled(Box)`
  width: 250px;
  padding: 20px 10px;
`;

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <StyledHeader>
      <StyledToolbar>
        <MenuButton onClick={() => setOpen(true)}>
          <MenuIcon />
        </MenuButton>

        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <DrawerWrapper>
            <CustomButtons isDrawer />
          </DrawerWrapper>
        </Drawer>

        <LogoContainer to="/">
          <LogoIconWrapper>
            <StyledCartIcon />
          </LogoIconWrapper>

          <LogoTextWrapper>
            <LogoText sx={{ color: "#ffffff" }}>
              Quick<span>Cart</span>247
            </LogoText>

            <SubHeading>
              Shop Smart
              <PlusText>&nbsp;• Anytime</PlusText>
            </SubHeading>
          </LogoTextWrapper>
        </LogoContainer>

        <Search />

        <CustomButtonWrapper>
          <CustomButtons />
        </CustomButtonWrapper>
      </StyledToolbar>
    </StyledHeader>
  );
};

export default Header;