const jwt = require("jsonwebtoken");

const adminauth = (req, res, next) => {
  const token = req.header("admin-token");
  if (!token)
    return res.status(401).json({ message: "please go to the login page" });

  try {
    const varifield = jwt.verify(token, process.env.SECRET_TOKEN2);
    req.admins = varifield;
    next();
  } catch (err) {
    res.status(400).json({ message: "invalid token" });
  }
};

module.exports = adminauth;
