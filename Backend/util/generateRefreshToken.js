const jwt = require("jsonwebtoken");

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return refreshToken;
};

module.exports = generateRefreshToken;
