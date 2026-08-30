import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  styled,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled(Box)`
  min-height: calc(100vh - 55px);
  background: #f1f5f9;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
`;

const Card = styled(Paper)`
  width: 460px;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
`;

const Header = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 28px;
`;

const LogoCircle = styled(Box)`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffe500 0%, #fb923c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 6px 16px rgba(251, 146, 60, 0.35);
`;

const TabSwitch = styled(Box)`
  display: flex;
  background: #e2e8f0;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 24px;
`;

const TabButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }) => ({
  flex: 1,
  textAlign: "center",
  padding: "11px 0",
  borderRadius: "8px",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  color: active ? "#fff" : "#64748b",
  background: active
    ? "linear-gradient(135deg, #4C3FE0 0%, #7C3AED 100%)"
    : "transparent",
  transition: "all 0.2s ease",
}));

const StyledField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    background: #ffffff;
  }

  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: #e2e8f0;
  }

  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #7c3aed;
    border-width: 2px;
  }
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
  }
`;

const signupInitialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  businessName: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};

const SellerAuth = () => {
  const [view, setView] = useState("login");

  const [signup, setSignup] = useState(signupInitialValues);

  const [login, setLogin] = useState(loginInitialValues);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  // ==========================================
  // SIGNUP INPUT
  // ==========================================

  const handleSignupChange = (e) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ==========================================
  // LOGIN INPUT
  // ==========================================

  const handleLoginChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ==========================================
  // SELLER SIGNUP
  // ==========================================

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${API_URL}/seller/signup`,
        signup
      );

      if (response.status === 201) {
        alert("Seller account created successfully!");

        setSignup(signupInitialValues);

        setView("login");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create seller account"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SELLER LOGIN
  // ==========================================

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${API_URL}/seller/login`,
        login
      );

      if (response.status === 200) {
        const seller = response.data.data;

        // Save seller information
        localStorage.setItem(
          "seller",
          JSON.stringify(seller)
        );

        // Go to seller dashboard
        navigate("/seller/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card elevation={0}>
        <Header>
          <LogoCircle>
            <StorefrontIcon
              sx={{
                color: "#1E293B",
                fontSize: 32,
              }}
            />
          </LogoCircle>

          <Typography
            variant="h6"
            fontWeight={700}
            color="#1e293b"
          >
            QuickCart247 Seller
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "#64748B",
              mt: 0.5,
            }}
          >
            Start selling with QuickCart247
          </Typography>
        </Header>

        {/* TABS */}

        <TabSwitch>
          <TabButton
            active={view === "login"}
            onClick={() => {
              setView("login");
              setError("");
            }}
          >
            Log in
          </TabButton>

          <TabButton
            active={view === "signup"}
            onClick={() => {
              setView("signup");
              setError("");
            }}
          >
            Sign up
          </TabButton>
        </TabSwitch>

        {/* ERROR */}

        {error && (
          <Typography
            sx={{
              color: "#DC2626",
              fontSize: 13,
              mb: 2,
            }}
          >
            {error}
          </Typography>
        )}

        {/* ======================================
            LOGIN
        ====================================== */}

        {view === "login" ? (
          <Box
            display="flex"
            flexDirection="column"
            gap="18px"
          >
            <StyledField
              fullWidth
              size="small"
              label="Username"
              name="username"
              value={login.username}
              onChange={handleLoginChange}
            />

            <StyledField
              fullWidth
              size="small"
              label="Password"
              type="password"
              name="password"
              value={login.password}
              onChange={handleLoginChange}
            />

            <PrimaryButton
              variant="contained"
              fullWidth
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </PrimaryButton>
          </Box>
        ) : (
          /* ======================================
             SIGNUP
          ====================================== */

          <Box
            display="flex"
            flexDirection="column"
            gap="16px"
          >
            <Box
              display="flex"
              gap="12px"
            >
              <StyledField
                fullWidth
                size="small"
                label="First name"
                name="firstname"
                value={signup.firstname}
                onChange={handleSignupChange}
              />

              <StyledField
                fullWidth
                size="small"
                label="Last name"
                name="lastname"
                value={signup.lastname}
                onChange={handleSignupChange}
              />
            </Box>

            <StyledField
              fullWidth
              size="small"
              label="Username"
              name="username"
              value={signup.username}
              onChange={handleSignupChange}
            />

            <StyledField
              fullWidth
              size="small"
              label="Email"
              name="email"
              type="email"
              value={signup.email}
              onChange={handleSignupChange}
            />

            <StyledField
              fullWidth
              size="small"
              label="Password"
              name="password"
              type="password"
              value={signup.password}
              onChange={handleSignupChange}
            />

            <StyledField
              fullWidth
              size="small"
              label="Mobile number"
              name="phone"
              value={signup.phone}
              onChange={handleSignupChange}
            />

            <StyledField
              fullWidth
              size="small"
              label="Business name"
              name="businessName"
              value={signup.businessName}
              onChange={handleSignupChange}
            />

            <PrimaryButton
              variant="contained"
              fullWidth
              onClick={handleSignup}
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create Seller Account"}
            </PrimaryButton>
          </Box>
        )}
      </Card>
    </Container>
  );
};

export default SellerAuth;