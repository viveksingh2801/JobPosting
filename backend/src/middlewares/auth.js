const jwt = require("jsonwebtoken");
const User = require("../models/user");

const optionalUserAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next();
    }

    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error(
        "User not found: The account associated with this token does not exist."
      );
    }

    req.user = user;
  } catch (err) {
    console.error("Error in optional authentication:", err.message);
  }

  next();
};

module.exports = {
  optionalUserAuth,
};
