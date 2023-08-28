const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const { authToken } = req.cookies;

  console.log("Your Auth token is: ", authToken);

  if (authToken) {
    const deCodeToken = await jwt.verify(authToken, process.env.SECRET_KEY);

    req.userId = deCodeToken.id;
    next();
  } else {
    res.status(400).json({
      error: {
        errorMessage: ["Please login to your account!"],
      },
    });
  }
};
