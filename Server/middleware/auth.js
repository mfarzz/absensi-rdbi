const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded; // Menyimpan data pengguna dari token
    next();
  });
};

module.exports = auth;
