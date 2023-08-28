const userSchema = require("../models/authModel");

module.exports.userGetFriends = async (req, res) => {
  console.log("User get friends called");

  try {
    const friendData = await userSchema.find({});
    console.log("Friends from database: ", friendData);

    res.status(200).json({
      success: true,
      friends: friendData,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};
