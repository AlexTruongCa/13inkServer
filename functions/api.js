import dotenv from "dotenv";
import express, { Router } from "express";
import serverless from "serverless-http";
import cors from "cors";

dotenv.config();

const app = express();
const url1 =
  "https://graph.instagram.com/me/media?fields=id,username,media_type,caption,media_url,permalink";

app.use(cors());

const router = Router();

router.get("/", async (req, res) => {
  const response = await fetch(url1, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.INSTAGRAM_TOKEN}`,
    },
  });
  const apiResponseJson = await response.json();
  res.send(apiResponseJson);
  // console.log(apiResponseJson);
});

app.use("/", router);

export const handler = serverless(app);
