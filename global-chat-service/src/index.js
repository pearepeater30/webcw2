const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");

const indexRouter = require("./routes/chat");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

const PORT = 7000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));

//Runs When Client Connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ room }) => {
    socket.join(room);

    socket.emit("message", "Welcome to the Chat");

    io.to(room).emit("roomUsers", {
      room: room
    })
  })

  //Upon Getting an Event, The Message Sent is Sent to Its Corresponding Room
  socket.on("chatMessage", (msg,room) => {
    io.to(room).emit("message", msg);
  });
});
