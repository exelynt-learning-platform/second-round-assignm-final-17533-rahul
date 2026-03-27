import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({
        error: data.error?.message || "OpenAI error",
      });
    }

    res.json({
      reply: data.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
