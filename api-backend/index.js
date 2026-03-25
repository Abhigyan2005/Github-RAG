import express from "express";
import dotenv from "dotenv";

const PORT = process.env.PORT;
const app = express();
dotenv.config();



app.listen(PORT || 6000, () => {
  console.log(`api backend connected to PORT ${PORT}`);
});
