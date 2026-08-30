import User from "../models/user.models.js";

// ======================================================
// USER SIGNUP
// ======================================================

export const userSignup = async (req, res) => {
  try {
    const exist = await User.findOne({
      username: req.body.username,
    });

    if (exist) {
      return res.status(401).json({
        message: "username already exists",
      });
    }

    const newUser = new User(req.body);

    await newUser.save();

    return res.status(200).json({
      message: "Account created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// USER LOGIN
// ======================================================

export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username,
      password,
    });

    if (user) {
      return res.status(200).json({
        data: user,
      });
    }

    return res.status(401).json({
      message: "Invalid username or password",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};