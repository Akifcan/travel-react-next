import express, { Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import { Server, Socket } from "socket.io";

dotenv.config();
import config from "./config";
import pinsRoute from "./routes/pins";
import usersRoute from "./routes/users";

mongoose.connect(config.host, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors({ origin: config.origin }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(morgan("dev"));

app.use("/api/pins", pinsRoute);
app.use("/api/users", usersRoute);

const server = app.listen(config.port, () =>
  console.log(`Server listening on ${config.port}`)
);

const io = new Server(server, {
  cors: {
    origin: config.origin,
  },
});

io.on("connection", (socket: Socket) => {
  socket.on("new-place", (data) => {
    socket.broadcast.emit("list-new-place", data);
  });
});
