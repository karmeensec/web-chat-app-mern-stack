const router = require("express").Router();

const {
  userGetFriends,
  userSendMessage,
  userGetMessage,
  userSendImageMessage,
} = require("../controller/messengerController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/get-friends", authMiddleware, userGetFriends);
router.post("/send-message", authMiddleware, userSendMessage);
router.get("/get-message/:id", authMiddleware, userGetMessage);
router.post("/image-message-send", authMiddleware, userSendImageMessage);

module.exports = router;
