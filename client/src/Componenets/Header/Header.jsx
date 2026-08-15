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

const LogoText = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
  font-style: italic;
  color: #ffffff;
  line-height: 1;
  white-space: nowrap;
`;

const SubHeading = styled(Typography)`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-style: italic;
  color: #ffffff;
  margin-top: 2px;
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
          <LogoText>QuickCart247</LogoText>

          <SubHeading>
            Explore
            <PlusText>&nbsp;Plus</PlusText>
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