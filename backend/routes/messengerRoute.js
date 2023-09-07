const router = require("express").Router();

const {
  userGetFriends,
  userSendMessage,
  userGetMessage,
  userSendImageMessage,
  userSeenMessage,
  userDeliveredMessage,
} = require("../controller/messengerController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/get-friends", authMiddleware, userGetFriends);
router.post("/send-message", authMiddleware, userSendMessage);
router.get("/get-message/:id", authMiddleware, userGetMessage);
router.post("/image-message-send", authMiddleware, userSendImageMessage);
router.post("/seen-message", authMiddleware, userSeenMessage);
router.post("/delivered-message", authMiddleware, userDeliveredMessage);

module.exports = router;
