const jwt = require("jsonwebtoken");
const SECRET = "demosecretkey"; //Should not be stored in code in a real application

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    SECRET,
    { expiresIn: "1h" }
  );
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken, SECRET };
