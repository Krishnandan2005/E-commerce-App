import bcrypt from "bcryptjs";
import Seller from "../models/seller.models.js";

// ======================================================
// SELLER SIGNUP
// ======================================================

export const sellerSignup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      phone,
      businessName,
    } = req.body;

    // Check username
    const usernameExists = await Seller.findOne({ username });

    if (usernameExists) {
      return res.status(401).json({
        message: "Username already exists",
      });
    }

    // Check email
    const emailExists = await Seller.findOne({ email });

    if (emailExists) {
      return res.status(401).json({
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      phone,
      businessName,
    });

    await newSeller.save();

    return res.status(201).json({
      message: "Seller registered successfully",
      data: {
        id: newSeller._id,
        firstname: newSeller.firstname,
        lastname: newSeller.lastname,
        username: newSeller.username,
        email: newSeller.email,
        phone: newSeller.phone,
        businessName: newSeller.businessName,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// SELLER LOGIN
// ======================================================

export const sellerLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find seller
    const seller = await Seller.findOne({ username });

    if (!seller) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      seller.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    return res.status(200).json({
      message: "Seller login successful",
      data: {
        id: seller._id,
        firstname: seller.firstname,
        lastname: seller.lastname,
        username: seller.username,
        email: seller.email,
        phone: seller.phone,
        businessName: seller.businessName,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};