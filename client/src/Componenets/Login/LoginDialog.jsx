import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Dialog,
  styled,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { DataContext } from "../../context/DataProvider";
import { authenticateSignup, authenticateLogin } from "../../service/api";

const Component = styled(Box)`
  width: 460px;
  padding: 48px 44px;
  box-sizing: border-box;
  background: #f8fafc;
`;

const Header = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 32px;
`;

const LogoCircle = styled(Box)`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffe500 0%, #fb923c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  box-shadow: 0 6px 16px rgba(251, 146, 60, 0.35);
`;

const TabSwitch = styled(Box)`
  display: flex;
  background: #e2e8f0;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 32px;
`;

const TabButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  flex: 1,
  textAlign: "center",
  padding: "12px 0",
  borderRadius: "8px",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  color: active ? "#ffffff" : "#94A3B8",
  background: active
    ? "linear-gradient(135deg, #4C3FE0 0%, #7C3AED 100%)"
    : "transparent",
  boxShadow: active ? "0 4px 10px rgba(76, 63, 224, 0.3)" : "none",
  transition: "all 0.2s ease",
}));

const StyledField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    background: #ffffff;
  }

  & .MuiOutlinedInput-input {
    padding: 14px;
  }

  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: #e2e8f0;
  }

  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #7c3aed;
    border-width: 2px;
  }
`;

const FieldRow = styled(Box)`
  display: flex;
  gap: 16px;
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #4c3fe0 0%, #7c3aed 100%);
  color: #fff;
  text-transform: none;
  font-size: 15px;
  font-weight: 600;
  height: 50px;
  border-radius: 8px;
  margin-top: 4px;
  box-shadow: 0 6px 14px rgba(124, 58, 237, 0.3);

  &:hover {
    background: linear-gradient(135deg, #4338ca 0%, #6d28d9 100%);
    box-shadow: 0 8px 18px rgba(124, 58, 237, 0.4);
  }
`;

const OtpButton = styled(Button)`
  border: 1.5px solid #0f766e;
  color: #0f766e;
  text-transform: none;
  font-size: 15px;
  font-weight: 600;
  height: 50px;
  border-radius: 8px;
  background: #ffffff;

  &:hover {
    border-color: #0f766e;
    background: #f0fdfa;
  }
`;

const Terms = styled(Typography)`
  color: #94a3b8;
  font-size: 12px;
  text-align: center;
  margin-top: 22px;
  line-height: 1.6;
`;

const OrText = styled(Typography)`
  color: #94a3b8;
  text-align: center;
  font-size: 13px;
  margin: 22px 0;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 38%;
    height: 1px;
    background: #e2e8f0;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const signupInitialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};

function LoginDialog({ open, setOpen }) {
  const [view, setView] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");

  const { setAccount } = useContext(DataContext);

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    setView("login");
    setSignup(signupInitialValues);
    setLogin(loginInitialValues);
    setError("");
  };

  const signupUser = async () => {
    const response = await authenticateSignup(signup);
    if (!response) return;
    setAccount(signup.firstname);
    handleClose();
  };

  const loginUser = async () => {
    const response = await authenticateLogin(login);
    if (response.status === 200) {
      setError("");
      setAccount(response.data.data.firstname);
      handleClose();
    } else {
      setError(response.data.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: "16px" } }}
    >
      <Component>
        <Header>
          <LogoCircle>
            <ShoppingCartIcon sx={{ color: "#1E293B", fontSize: 30 }} />
          </LogoCircle>
          <Typography variant="h6" fontWeight={700}>
            Welcome to QuickCart247
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#64748B", mt: 0.5 }}>
            Shop smart, anytime, anywhere
          </Typography>
        </Header>

        <TabSwitch>
          <TabButton active={view === "login"} onClick={() => setView("login")}>
            Log in
          </TabButton>
          <TabButton active={view === "signup"} onClick={() => setView("signup")}>
            Sign up
          </TabButton>
        </TabSwitch>

        {view === "login" ? (
          <Box display="flex" flexDirection="column" gap="18px">
            <StyledField
              fullWidth
              size="small"
              label="Username"
              name="username"
              onChange={onValueChange}
            />
            <StyledField
              fullWidth
              size="small"
              label="Password"
              type="password"
              name="password"
              onChange={onValueChange}
            />

            {error && (
              <Typography sx={{ color: "#DC2626", fontSize: 13 }}>
                {error}
              </Typography>
            )}

            <PrimaryButton variant="contained" fullWidth onClick={loginUser}>
              Log in
            </PrimaryButton>

            <OrText>or</OrText>

            <OtpButton variant="outlined" fullWidth>
              Request OTP
            </OtpButton>

            <Terms>
              By continuing, you agree to QuickCart247's Terms of Use and
              Privacy Policy.
            </Terms>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap="18px">
            <FieldRow>
              <StyledField
                fullWidth
                size="small"
                label="First name"
                name="firstname"
                onChange={onInputChange}
              />
              <StyledField
                fullWidth
                size="small"
                label="Last name"
                name="lastname"
                onChange={onInputChange}
              />
            </FieldRow>

            <StyledField
              fullWidth
              size="small"
              label="Username"
              name="username"
              onChange={onInputChange}
            />
            <StyledField
              fullWidth
              size="small"
              label="Email"
              name="email"
              onChange={onInputChange}
            />
            <StyledField
              fullWidth
              size="small"
              label="Password"
              type="password"
              name="password"
              onChange={onInputChange}
            />
            <StyledField
              fullWidth
              size="small"
              label="Mobile number"
              name="phone"
              onChange={onInputChange}
            />

            <PrimaryButton variant="contained" fullWidth onClick={signupUser}>
              Create account
            </PrimaryButton>
          </Box>
        )}
      </Component>
    </Dialog>
  );
}

export default LoginDialog;