import dotenv from "dotenv";
import express from "express";
import { BooksRouter } from "./router/BooksRouter.js";
import { UsersRouter } from "./router/UserRouter.js";
import homeRouter from "./routes/homeRouter.js";
import assetsRouter from "./routes/assetsRouter.js";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8800",
  })
);

app.use(cookieParser());
const publicPath = path.join(path.resolve(), "../client/public");
const distPath = path.join(path.resolve(), "../client/dist");
const assetsPath = path.join(path.resolve(), "../client/src/assets");

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(distPath));
} else {
  app.use("/", express.static(publicPath));
  app.use("/src", assetsRouter);
}
app.use("/assets", express.static(assetsPath));
app.use("/books/users", UsersRouter);
app.use("/books/api", BooksRouter);
app.use(homeRouter);

app.listen(process.env.PORT, () => {
  console.log(`Connected to server. http://localhost:${process.env.PORT}`);
});
