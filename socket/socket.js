console.log("It is coming from Socket");

const socketIO = require("socket.io")(8000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

socketIO.on("connection", (socket) => {
  console.log("Socket connection");
});
