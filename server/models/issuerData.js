const mongoose = require('mongoose');

const issuerDataSchema = new mongoose.Schema({
  certificate: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const IssuerData = mongoose.model('issuerData', issuerDataSchema);

module.exports = IssuerData;
