import React, { useState } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";

function Profile({ account, setAccount }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ======================================================
  // MY ORDERS
  // ======================================================

  const handleOrders = () => {
    handleClose();
    navigate("/orders");
  };

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    setAccount("");
    handleClose();
  };

  return (
    <Box>
      {/* USER NAME */}

      <Typography
        onClick={handleClick}
        sx={{
          mt: 0.5,
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {account?.firstname || "Account"}
      </Typography>

      {/* PROFILE MENU */}

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter:
                "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,

              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform:
                  "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        {/* MY ORDERS */}

        <MenuItem onClick={handleOrders}>
          <ListItemIcon>
            <ShoppingBagIcon
              fontSize="small"
              color="primary"
            />
          </ListItemIcon>

          My Orders
        </MenuItem>

        {/* LOGOUT */}

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon
              fontSize="small"
              color="primary"
            />
          </ListItemIcon>

          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Profile;