const userSchema = require("../models/authModel");

module.exports.userGetFriends = async (req, res) => {
  console.log("User get friends called");

  const userId = req.userId;
  console.log("User Id: ", userId);

  try {
    const friendData = await userSchema.find({});
    console.log("Friends from database: ", friendData);

    const filteredFriendData = friendData.filter(
      (friend) => friend.id !== userId
    );

    res.status(200).json({
      success: true,
      friends: filteredFriendData,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};
