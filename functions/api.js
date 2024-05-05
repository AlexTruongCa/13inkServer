import dotenv from "dotenv";
import express, { Router } from "express";
import serverless from "serverless-http";
import cors from "cors";

dotenv.config();

const app = express();
const url1 =
  "https://graph.instagram.com/me/media?fields=id,username,media_type,caption,media_url,permalink";

app.use(cors());
app.use(express.json()); // Add this middleware to parse JSON bodies

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch(url1, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.INSTAGRAM_TOKEN}`,
      },
    });
    console.log(response);
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
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // console.log(apiResponseJson);
});

router.post("/", async (req, res) => {
  try {
    // Here you can access the JSON data sent in the request body
    const postData = req.body;
    console.log("Received POST data:", postData);

    // Perform actions with the POST data as needed

    res.status(200).json({ message: "Data received successfully" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/", router);

export const handler = serverless(app);
