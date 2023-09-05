console.log("It is coming from Socket");

const socketIO = require("socket.io")(8000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (userInfoId, userInfo, socketId) => {
  const checkUser = users.some((user) => user.userInfoId === userInfoId);

  if (!checkUser) {
    users.push({ userInfoId, userInfo, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const findActiveUser = (id) => {
  const activeUser = users.find((user) => user.userInfoId === id);
  return activeUser;
};

socketIO.on("connection", (socket) => {
  console.log("Socket connection");

  socket.on("addUser", (userInfoId, userInfo) => {
    console.log("User info Id: ", userInfoId);
    console.log("User info: ", userInfo);
    console.log("Socket info: ", socket);
    console.log("Socket id: ", socket.id);

    addUser(userInfoId, userInfo, socket.id);

    socketIO.emit("getUser", users);
  });

  socket.on("sendMessage", (data) => {
    console.log("User Data: ", data);

    const activeUserData = findActiveUser(data.receiverId);

    console.log("Active User Data: ", activeUserData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");

    removeUser(socket.id);

    socketIO.emit("getUser", users);
  });
});
