import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./connection.js";
dotenv.config();

const PORT = process.env.PORT || 6000;
const url = process.env.MONGODB_URI;

const app = express();
app.get("/", (req, res) => {
  res.send("hello world");
});

connectDB(url);

app.listen(PORT, () => {
  console.log(`api backend connected to PORT ${PORT}`);
});
