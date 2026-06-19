import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


const API_KEY = process.env.GEMINI_API;


app.post("/ai", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    // extract clean text
    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||"no response from ai";

    res.json({text});

  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);

    res.status(500).json({
      error: "failed to fetch ai response"
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(` server running on http://localhost:${PORT}`);
});