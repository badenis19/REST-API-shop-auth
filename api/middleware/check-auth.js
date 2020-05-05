// Route protection
// To be able to access route, valid token is required.
// Add to route second argument after path. E.g. router.post('/', checkAuth) 

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // we place the token in headers and not in body
    const decoded = jwt.verify(token, process.env.JWT_KEY); // verify method return the decoded token if succeeds 
    req.userData = decoded // adding new field to request
    console.log("decoded", decoded)
    next(); // call next if successfully authenticated
  } catch (err) {
    console.log(err)
    console.log("Auth failed")
    return res.status(401).json({
      message: "Auth failed"

    })
  }
};