const router = require("express").Router();

const {
  userGetFriends,
  userSendMessage,
} = require("../controller/messengerController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/get-friends", authMiddleware, userGetFriends);
router.post("/send-message", authMiddleware, userSendMessage);

module.exports = router;
