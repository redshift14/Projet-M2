const mongoose = require('mongoose');

const studentDataSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  classof: {
    type: String,
    required: true
  }
});

const StudentData = mongoose.model('studentData', studentDataSchema);

module.exports = StudentData;
