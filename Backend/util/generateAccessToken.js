const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const accesstoken = jwt.sign(
    {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  return accesstoken;
};

module.exports = generateAccessToken;
