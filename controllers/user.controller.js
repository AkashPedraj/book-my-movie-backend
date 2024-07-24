const db = require("../models");
const User = db.user;
const { v4: uuidv4 } = require('uuid');
const TokenGenerator = require('uuid-token-generator');
const btoa = require('btoa');

// Sign Up
exports.signUp = async (req, res) => {
  const { first_name, last_name, password } = req.body;
  
  if (!first_name || !last_name || !password) {
    return res.status(400).send({
      message: "All fields are required!"
    });
  }
  
  const username = `${first_name}${last_name}`;
  const uuid = uuidv4();
  
  try {
    const user = new User({
      first_name,
      last_name,
      username,
      password: btoa(password), // Encode the password using btoa
      uuid,
      isLoggedIn: false
    });
    
    await user.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User."
    });
  }
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).send({
      message: "All fields are required!"
    });
  }
  
  try {
    const user = await User.findOne({ username });
    
    if (!user || user.password !== btoa(password)) {
      return res.status(401).send({
        message: "Invalid username or password!"
      });
    }
    
    const tokenGenerator = new TokenGenerator();
    const access_token = tokenGenerator.generate();
    
    user.access_token = access_token;
    user.isLoggedIn = true;
    await user.save();
    
    res.status(200).send({
      message: "User logged in successfully!",
      uuid: user.uuid,
      access_token: user.access_token
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while logging in."
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  const { uuid } = req.body;
  
  if (!uuid) {
    return res.status(400).send({
      message: "UUID is required!"
    });
  }
  
  try {
    const user = await User.findOne({ uuid });
    
    if (!user) {
      return res.status(404).send({
        message: "User not found!"
      });
    }
    
    user.access_token = null;
    user.isLoggedIn = false;
    await user.save();
    
    res.status(200).send({
      message: "User logged out successfully!"
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while logging out."
    });
  }
};

// Get Coupon Code
exports.getCouponCode = async (req, res) => {
  const { uuid } = req.body;

  if (!uuid) {
    return res.status(400).send({
      message: "UUID is required!"
    });
  }

  try {
    const user = await User.findOne({ uuid });

    if (!user) {
      return res.status(404).send({
        message: "User not found!"
      });
    }

    // Generate a sample coupon code (you can customize this logic)
    const couponCode = uuidv4().slice(0, 8).toUpperCase();
    
    res.status(200).send({
      message: "Coupon code retrieved successfully!",
      couponCode: couponCode
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving the coupon code."
    });
  }
};

// Book Show
exports.bookShow = async (req, res) => {
  const { uuid, showDetails } = req.body;

  if (!uuid || !showDetails) {
    return res.status(400).send({
      message: "UUID and show details are required!"
    });
  }

  try {
    const user = await User.findOne({ uuid });

    if (!user) {
      return res.status(404).send({
        message: "User not found!"
      });
    }

    // Sample booking logic (you can customize this logic)
    // For demonstration, we're just returning the booking details
    // You might want to save booking details in a booking collection or handle it differently
    res.status(200).send({
      message: "Show booked successfully!",
      bookingDetails: {
        uuid: user.uuid,
        ...showDetails
      }
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while booking the show."
    });
  }
};
