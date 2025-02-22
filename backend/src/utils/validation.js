const validator = require("validator");

const validateSignUpData = (req) => {
  const { name, email, mobile, password } = req.body;
  if (!name) {
    throw new Error("Name fields cannot be empty.");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email format.");
  }  else if (!validator.isMobilePhone(mobile, "en-IN")) {  
    throw new Error("Invalid mobile number.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be stronger.");
  }
};

module.exports = {
  validateSignUpData,
};
