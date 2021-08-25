const router = require('express').Router();
const User = require('../models/userModel');
const verifierAuth = require('../middleware/verifierAuth');
const studentAuth = require('../middleware/studentAuth');
const issuerAuth = require('../middleware/issuerAuth');
const VerifierData = require('../models/verifierData');
const IssuerData = require('../models/issuerData');
const StudentData = require('../models/studentData');

router.get('/verifier', verifierAuth, async (req, res) => {
  try {
    const verifierData = await VerifierData.find();
    res.json(verifierData);
  }
  catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post('/verifier', verifierAuth, async (req, res) => {
  try {
    const { client, status } = req.body;
    const newVerifierData = new VerifierData({
      client, status
    });
    const savedVerifierData = await newVerifierData.save();
    res.json({savedVerifierData});
  }
  catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/student', studentAuth, async (req, res) => {
  try {
    const studentData = await StudentData.find();
    res.json(studentData);
  }
  catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post('/student', studentAuth, async (req, res) => {
  try {
    const { displayName, classof } = req.body;
    const newStudentData = new StudentData({
      displayName, classof
    });
    const savedStudentData = await newStudentData.save();
    res.json({savedStudentData});
  }
  catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/issuer', issuerAuth, async (req, res) => {
  try {
    const isuerData = await IssuerData.find();
    res.json(issuerData);
  }
  catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post('/issuer', issuerAuth, async (req, res) => {
  try {
    const { certificate } = req.body;
    const newIssuerData = new IssuerData({
      certificate
    });
    const savedIssuerData = await newIssuerData.save();
    res.json({savedIssuerData});
  }
  catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
