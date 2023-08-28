const router = require("express").Router();

const { userGetFriends } = require("../controller/messengerController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/get-friends", authMiddleware, userGetFriends);

module.exports = router;
