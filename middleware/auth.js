//// IMPORT ////
const jwt = require("jsonwebtoken"); //token

//// AUTHENTIFICATION MIDDLEWARE ////
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //take token
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // check TOKEN
    const userId = decodedToken.userId; //Take User ID
    req.auth = {
      //for authentification
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
