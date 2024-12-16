import express from "express";
import BaseRouter from "./router";
import cors from "cors";
const app = express();
const port = 8080;
app.use(
  cors({
    origin: ["http://localhost:3000", "https://railway-schedules.vercel.app"],
    preflightContinue: true,
    credentials: true,
  })
);
app.use(new BaseRouter().router);
app.listen(port, async () => {
  console.log(`http://localhost:${port}`);
});