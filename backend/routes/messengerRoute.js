const router = require("express").Router();

const { userGetFriends } = require("../controller/messengerController");

router.get("/get-friends", userGetFriends);

module.exports = router;
