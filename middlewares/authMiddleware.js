const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // Getting token from header part of request
  const token = req.header("x-auth-token");
  // checking if token is present or not
  if (!token) {
    return res.status(401).json({ message: "No Token, Authorization Denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
