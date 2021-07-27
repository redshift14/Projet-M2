const jwt = require('jsonwebtoken');

function issuerAuth (req, res, next) {
  try {
    const authToken = req.cookies.authToken;
    // Check the token if exists
    if(!authToken)
      return res.status(401).json({errorMessage: "Unauthorizd"});

    console.log(authToken);

    const verified = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = verified.user;

    const role = verified.role;
    console.log(role);

    if(!(role === 'Issuer')) {
      return res.status(401).json({errorMessage: "Unauthorizd"});
    }
    next();
  }
  catch (error) {
    console.error(error);
    res.status(401).json({errorMessage: 'Unauthorizd'});
  }
}

module.exports = issuerAuth;
