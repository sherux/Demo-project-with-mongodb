const jwt = require("jsonwebtoken");

const staffauth2 = (req, res, next) => {
  const token = req.header("staff-token");
  if (!token)
    return res.status(401).json({ message: "please go to login page" });

  try {
    const varifield = jwt.verify(token, process.env.SECRET_TOKEN3);
    req.staffs = varifield;
    next();
  } catch (err) {
    res.status(400).json({ message: "invalid token" });
  }
};

module.exports = staffauth2;
