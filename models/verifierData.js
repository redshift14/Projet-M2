const mongoose = require('mongoose');

const verifierDataSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true
  },
  status: {
    type: Boolean
  }
});

const VerifierData = mongoose.model('verifierData', verifierDataSchema);

module.exports = VerifierData;
