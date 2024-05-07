// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();
// import cors from "cors";
// app.use(cors());

// exports.handler = function instagram(event, context, callback) {
//   const token = process.env.INSTAGRAM_TOKEN;
//   const url = `https://graph.instagram.com/me/media?fields=id,username,media_type,caption,media_url,permalink&access_token=${token}`;

//   axios
//     .get(url)
//     .then(({ data: { data: posts } }) => {
//       callback(null, {
//         statusCode: 200,
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(
//           posts.map((i) => ({
//             id: i.id,
//             url: i.media_url,
//             caption: i.caption,
//             permalink: i.permalink,
//             mediaType: i.media_type,
//             username: i.username,
//           }))
//         ),
//       });
//     })
//     .catch((e) => {
//       callback(e);
//     });
// };

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function handler(event, context) {
  try {
    const token = process.env.INSTAGRAM_TOKEN;
    const url = `https://graph.instagram.com/me/media?fields=id,username,media_type,caption,media_url,permalink&access_token=${token}`;

    const response = await axios.get(url);
    const { data } = response.data;

    const posts = data.map((post) => ({
      id: post.id,
      url: post.media_url,
      caption: post.caption,
      permalink: post.permalink,
      mediaType: post.media_type,
      username: post.username,
    }));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posts),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

// import dotenv from "dotenv";
// import express, { Router } from "express";
// import serverless from "serverless-http";
// ;

//

// const app = express();
// const url1 =
//   "https://graph.instagram.com/me/media?fields=id,username,media_type,caption,media_url,permalink";

// ;

// const router = Router();

// router.get("/", async (req, res) => {
//   try {
//     const response = await fetch(url1, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${process.env.INSTAGRAM_TOKEN}`,
//       },
//     });
//     console.log(response);
//     if (!response.ok) {
//       throw new Error("Failed to fetch data from Instagram API");
//     }

//     const contentType = response.headers.get("content-type");
//     if (contentType && contentType.includes("application/json")) {
//       const apiResponseJson = await response.json();
//       res.json(apiResponseJson);
//     } else {
//       const responseBody = await response.text();
//       console.log("Response body:", responseBody);
//       throw new Error("Response is not in JSON format");
//     }
//   } catch (error) {
//     console.error("Error", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
//   // console.log(apiResponseJson);
// });

// app.use("/", router);

// export const handler = serverless(app);
