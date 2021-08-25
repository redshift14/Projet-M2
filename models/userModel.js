const mongoose = require('mongoose');

const Roles = Object.freeze({
  STUDENT: "Student",
  VERIFIER: "Verifier",
  ISSUER: "Issuer"
});

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passwordHash:{
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(Roles),
    required: true
  }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
