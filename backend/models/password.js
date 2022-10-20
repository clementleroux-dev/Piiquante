//// IMPORT ////
const passwordValidator = require("password-validator");

//// MODEL PASSWORD ////
const passwordSchema = new passwordValidator();
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase(1) // Must have  1 uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123", "Azerty123"]); // Blacklist these values

module.exports = passwordSchema;
