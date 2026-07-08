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
  flexDirection: "column",
  justifyContent: "center",
  marginLeft: "12%",
  marginRight: "8px",
  lineHeight: 0,
  textDecoration: "none",

  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
  },
}));

const Logo = styled("img")`
  width: 75px;
`;

const SubHeading = styled(Typography)`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-style: italic;
  color: #ffffff;
  margin-top: -2px;
`;

const PlusText = styled("span")`
  color: #ffe500;
  font-weight: 500;
  margin-left: 2px;
`;

const PlusImage = styled("img")`
  width: 10px;
  height: 10px;
  margin-left: 3px;
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

const logoURL =
  "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";

const subURL =
  "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <StyledHeader>
      <StyledToolbar>
        <MenuButton onClick={() => setOpen(true)}>
          <MenuIcon />
        </MenuButton>

        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
        >
          <DrawerWrapper>
            <CustomButtons isDrawer />
          </DrawerWrapper>
        </Drawer>

        <LogoContainer to="/">
          <Logo src={logoURL} alt="Flipkart" />

          <SubHeading>
            Explore
            <PlusText>&nbsp;Plus</PlusText>
            <PlusImage src={subURL} alt="Plus" />
          </SubHeading>
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