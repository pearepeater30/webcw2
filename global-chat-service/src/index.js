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

//runs when client connects
io.on("connection", (socket) => {
  console.log("New WS Connection...");

  socket.emit("message", "Welcome to the Chat");

  socket.broadcast.emit("message", "A user has joined the room");

  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });

  socket.on("chatMessage", (msg) => {
    console.log(msg);
    io.emit("message", msg);
  });
});
