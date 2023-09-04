const userSchema = require("../models/authModel");
const messageSchema = require("../models/messageModel");

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

module.exports.userSendMessage = async (req, res) => {
  console.log("User Send Message called");

  console.log("userSendMessage Req body: ", req.body);

  const { senderName, receiverId, message } = req.body;

  const senderId = req.userId;

  try {
    const addMessage = await messageSchema.create({
      senderId: senderId,
      senderName: senderName,
      receiverId: receiverId,
      message: {
        text: message,
        image: "",
      },
    });

    res.status(201).json({
      success: true,
      message: addMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

module.exports.userGetMessage = async (req, res) => {
  console.log("User Get Message called");

  console.log("userGetMessage Req params: ", req.params.id);

  const userId = req.userId;
  console.log("User Id: ", userId);

  const friendId = req.params.id;

  try {
    let allMessages = await messageSchema.find({});

    allMessages = allMessages.filter(
      (message) =>
        (message.senderId === userId && message.receiverId === friendId) ||
        (message.receiverId === userId && message.senderId === friendId)
    );

    console.log("All Messages: ", allMessages);

    res.status(200).json({
      success: true,
      message: allMessages,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};
