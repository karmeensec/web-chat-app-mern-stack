const userSchema = require("../models/authModel");
const messageSchema = require("../models/messageModel");
const formidable = require("formidable");
const fs = require("fs");

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
