const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
//   console.log(authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is nor authorized");
      }
    //   console.log(decoded);
      req.uer = decoded.user;
      next();
    });

    if (!token || token === undefined) {
      res.status(401);
      throw new Error("User is nor authorized or token is missing");
    }
  }
});

module.exports = validateToken;
