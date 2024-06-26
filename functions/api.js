import dotenv from "dotenv";
import express, { Router } from "express";
import serverless from "serverless-http";
import cors from "cors";

dotenv.config();

const app = express();
const url1 =
  "https://graph.instagram.com/me/media?fields=id,username,media_type,caption,media_url,permalink";

app.use(cors());

app.use(express.json());

const router = Router();

router.get("/", async (req, res) => {
  if (req.headers.token !== process.env.VITE_CLIENT_TOKEN) {
    res.status(401).json({ error: "Not Authorized" });
    throw new Error("Not Authorized");
  }
  console.log("client token", req.headers.token);
  console.log("server token", process.env.VITE_CLIENT_TOKEN);

  try {
    const response = await fetch(url1, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.INSTAGRAM_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data from Instagram API");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const apiResponseJson = await response.json();
      res.json(apiResponseJson);
    } else {
      const responseBody = await response.text();
      console.log("Response body:", responseBody);
      throw new Error("Response is not in JSON format");
    }
    console.log("---response json---", response.json);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error });
  }
});

app.use("/", router);

export const handler = serverless(app);
