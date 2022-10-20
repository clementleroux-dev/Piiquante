//// IMPORT ////
const validator = require("validator");

//// EMAIL CONTROL ////
module.exports = (req, res, next) => {
  const { email } = req.body;

  if (validator.isEmail(email)) {
    console.log("email valide");
    next();
  } else {
    return res.status(400).json({ error: `l'email ${email} n'est pas valide` });
  }
};
