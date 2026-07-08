import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Dialog,
  styled,
} from "@mui/material";

import { DataContext } from "../../context/DataProvider";
import { authenticateSignup, authenticateLogin } from "../../service/api";

const Component = styled(Box)`
  height: 600px;
  display: flex;
`;

const Image = styled(Box)`
  width: 45%;
  background: #2874f0
    url("https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png")
    center 85% no-repeat;
  color: #ffffff;
  padding: 45px 35px;
  box-sizing: border-box;
`;

const Wrapper = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px 35px;
  box-sizing: border-box;

  & > * {
    margin-top: 12px;
  }
`;

const LoginButton = styled(Button)`
  background: #fb641b;
  color: #fff;
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  height: 48px;

  &:hover {
    background: #fb641b;
  }
`;

const OtpButton = styled(Button)`
  background: #fff;
  color: #2874f0;
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  height: 48px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    background: #fff;
  }
`;

const Terms = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const OrText = styled(Typography)`
  color: #878787;
  text-align: center;
  font-size: 14px;
`;

const CreateAccount = styled(Typography)`
  margin-top: auto;
  text-align: center;
  color: #2874f0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const accountInitialState = {
  login: {
    view: "login",
    heading: "Login",
    subheading: "Get access to your Orders, Wishlist and Recommendations",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here!",
    subheading: "Sign up with your mobile number to get started",
  },
};

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
  const [account, toggleAccount] = useState(accountInitialState.login);
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");

  const { setAccount } = useContext(DataContext);

  const toggleSignup = () => {
    toggleAccount(accountInitialState.signup);
  };

  const onInputChange = (e) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value,
    });
  };

  const onValueChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialState.login);
    setSignup(signupInitialValues);
    setLogin(loginInitialValues);
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
      paperprops={{
        sx: {
          width: 1000,
          maxWidth: "none",
          borderRadius: 0,
        },
      }}
    >
      <Component>
        <Image>
          <Typography variant="h5" fontWeight={600}>
            {account.heading}
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#DBDBDB",
              fontSize: 14,
            }}
          >
            {account.subheading}
          </Typography>
        </Image>

        {account.view === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              label="Enter Username"
              name="username"
              onChange={onValueChange}
            />

            <TextField
              variant="standard"
              label="Enter Password"
              type="password"
              name="password"
              onChange={onValueChange}
            />

            {error && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: 14,
                  mt: 1,
                }}
              >
                {error}
              </Typography>
            )}

            <Terms>
              By continuing, you agree to Flipkart's Terms of Use and Privacy
              Policy.
            </Terms>

            <LoginButton variant="contained" fullWidth onClick={loginUser}>
              Login
            </LoginButton>

            <OrText>OR</OrText>

            <OtpButton variant="contained" fullWidth>
              Request OTP
            </OtpButton>

            <CreateAccount onClick={toggleSignup}>
              New to Flipkart? Create an account
            </CreateAccount>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              label="First Name"
              name="firstname"
              onChange={onInputChange}
            />

            <TextField
              variant="standard"
              label="Last Name"
              name="lastname"
              onChange={onInputChange}
            />

            <TextField
              variant="standard"
              label="Username"
              name="username"
              onChange={onInputChange}
            />

            <TextField
              variant="standard"
              label="Email"
              name="email"
              onChange={onInputChange}
            />

            <TextField
              variant="standard"
              label="Password"
              type="password"
              name="password"
              onChange={onInputChange}
            />

            <TextField
              variant="standard"
              label="Mobile Number"
              name="phone"
              onChange={onInputChange}
            />

            <LoginButton variant="contained" fullWidth onClick={signupUser}>
              Continue
            </LoginButton>
          </Wrapper>
        )}
      </Component>
    </Dialog>
  );
}

export default LoginDialog;
