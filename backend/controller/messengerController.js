const userSchema = require("../models/authModel");
const messageSchema = require("../models/messageModel");
const formidable = require("formidable");
const fs = require("fs");

const getLastMessage = async (userId, friendId) => {
  const message = await messageSchema
    .findOne({
      $or: [
        {
          $and: [
            {
              senderId: {
                $eq: userId,
              },
            },

            {
              receiverId: {
                $eq: friendId,
              },
            },
          ],
        },

        {
          $and: [
            {
              receiverId: {
                $eq: userId,
              },
            },

            {
              senderId: {
                $eq: friendId,
              },
            },
          ],
        },
      ],
    })
    .sort({
      updatedAt: -1,
    });

  return message;
};

module.exports.userGetFriends = async (req, res) => {
  console.log("User get friends called");

  const userId = req.userId;
  console.log("User Id: ", userId);

  let friendMessage = [];

  try {
    const friendData = await userSchema.find({
      _id: {
        $ne: userId,
      },
    });
    console.log("Friends from database: ", friendData);

    for (let i = 0; i < friendData.length; i++) {
      let lastMessage = await getLastMessage(userId, friendData[i].id);

      console.log("Last Message: ", lastMessage);

      friendMessage = [
        ...friendMessage,
        {
          friendInfo: friendData[i],
          messageInfo: lastMessage,
        },
      ];

      console.log("Friend Message: ", friendMessage);
    }

    // const filteredFriendData = friendData.filter(
    //   (friend) => friend.id !== userId
    // );

    res.status(200).json({
      success: true,
      friends: friendMessage,
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
    let allMessages = await messageSchema.find({
      $or: [
        {
          $and: [
            {
              senderId: {
                $eq: userId,
              },
            },

            {
              receiverId: {
                $eq: friendId,
              },
            },
          ],
        },

        {
          $and: [
            {
              receiverId: {
                $eq: userId,
              },
            },

            {
              senderId: {
                $eq: friendId,
              },
            },
          ],
        },
      ],
    });

    // allMessages = allMessages.filter(
    //   (message) =>
    //     (message.senderId === userId && message.receiverId === friendId) ||
    //     (message.receiverId === userId && message.senderId === friendId)
    // );

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

module.exports.userSendImageMessage = (req, res) => {
  const senderId = req.userId;
  const form = new formidable.IncomingForm();

  form.parse(req, (error, fields, files) => {
    console.log("Fields: ", fields);
    console.log("Files: ", files);

    const senderName = fields.senderName[0];
    const receiverId = fields.receiverId[0];
    const imageName = fields.imageName[0];
    const { image } = files;

    console.log("Image is: ", image);

    console.log("Image name: ", imageName);

    const newPath = __dirname + `../../../frontend/public/images/${imageName}`;

    console.log("New Path: ", newPath);

    files.image.originalFilename = imageName;

    console.log("files.image.originalFilename: ", files.image.originalFilename);

    try {
      console.log("File path: ", files.image[0].filepath);
      fs.copyFile(files.image[0].filepath, newPath, async (error) => {
        if (error) {
          console.error("Image copy error:", error);
          res.status(500).json({
            error: {
              errorMessage: "Failed to upload an image!",
            },
          });
        } else {
          const addMessage = await messageSchema.create({
            senderId: senderId,
            senderName: senderName,
            receiverId: receiverId,
            message: {
              text: "",
              image: files.image.originalFilename,
            },
          });

          res.status(201).json({
            success: true,
            message: addMessage,
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        error: {
          errorMessage: "Internal Server Error",
        },
      });
    }
  });
};

module.exports.userSeenMessage = async (req, res) => {
  try {
    console.log("userSeenMessage Req Body:", req.body);

    const messageId = req.body._id;

    await messageSchema.findByIdAndUpdate(messageId, {
      status: "seen",
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

module.exports.userDeliveredMessage = async (req, res) => {
  try {
    console.log("userDeliveredMessage Req Body:", req.body);

    const messageId = req.body._id;

    await messageSchema.findByIdAndUpdate(messageId, {
      status: "delivered",
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};
