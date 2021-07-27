const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

  try {
    const { displayName, email, password, passwordVerify, role } = req.body;

    // Validation
    if(!displayName || !email || !password || !passwordVerify || !role)
      return res.status(400).json({errorMessage: 'Please enter all required fields'});

    if(password.length < 6)
      return res.status(400).json({errorMessage: 'Please enter a longer password'});

    if(password !== passwordVerify)
      return res.status(400).json({errorMessage: 'Passwords dont match'});

    const existingUser = await User.findOne({email: email});
    if(existingUser)
      return res.status(400).json({errorMessage: 'An account with this email is already exists'});

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Save the new user to the database
    const newUser = new User({
      displayName, email, passwordHash, role
    });

    const savedUser = await newUser.save();

    // Sign the jwt token
    const authToken = jwt.sign({
      user: savedUser.id,
      role: savedUser.role
    }, process.env.JWT_SECRET);

    // Send the token in a HTTP-only cookie
    res.cookie("authToken", authToken, {
      httpOnly: true
    }).send();

  }
  catch (error) {
    console.error(error);
    res.status(500).send();
  }

});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    // Validation
    if(!email || !password)
      return res.status(400).json({errorMessage: 'Please enter all required fields'});

    const existingUser = await User.findOne({email: email});
    if(!existingUser)
      return res.status(400).json({errorMessage: 'Wrong credentials'});

    const correctPassword = await bcrypt.compare(password, existingUser.passwordHash);
    if(!correctPassword)
      return res.status(401).json({errorMessage: 'Wrong credentials'});

    // Sign the token
    const authToken = jwt.sign({
      user: existingUser._id,
      role: existingUser.role
    }, process.env.JWT_SECRET);

    // Send the token in a HTTP-only cookie
    res.cookie("authToken", authToken, {
      httpOnly: true
    }).send();

  }
  catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get('/logout', (req, res) => {
  res.cookie("authToken", "", {
    httpOnly: true,
    expires: new Date(0)
  })
  .send();
});

router.get('/issuerloggedin', (req, res) => {
  try {
    const authToken = req.cookies.authToken;
    // Check the token if exists
    if(!authToken)
      return res.json(false);

    const verified = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = verified.user;

    const role = verified.role;

    if(!(role === 'Issuer')) {
      return res.json(false)
    }
    res.send(true);
  }
  catch (error) {
    console.error(error);
    res.json(false);
  }
});

router.get('/verifierloggedin', (req, res) => {
  try {
    const authToken = req.cookies.authToken;
    // Check the token if exists
    if(!authToken)
      return res.json(false);

    const verified = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = verified.user;

    const role = verified.role;

    if(!(role === 'Verifier')) {
      return res.json(false)
    }
    res.send(true);
  }
  catch (error) {
    console.error(error);
    res.json(false);
  }
});

router.get('/studentloggedin', (req, res) => {
  try {
    const authToken = req.cookies.authToken;
    // Check the token if exists
    if(!authToken)
      return res.json(false);

    const verified = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = verified.user;

    const role = verified.role;

    if(!(role === 'Student')) {
      return res.json(false)
    }
    res.send(true);
  }
  catch (error) {
    console.error(error);
    res.json(false);
  }
});

router.get('/logout', (req, res) => {
  res.cookie("authToken", "", {
    httpOnly: true,
    expires: new Date(0)
  })
  .send();
});

module.exports = router;
