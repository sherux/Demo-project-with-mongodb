const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({ message: "please go to login page" });

  try {
    const varifield = jwt.verify(token, process.env.SECRET_TOKEN);
    req.users = varifield;
    next();
  } catch (err) {
    res.status(400).json({ message: "invalid token" });
  }
};

module.exports = auth;
