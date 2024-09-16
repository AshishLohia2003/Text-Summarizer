require('dotenv').config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const axios = require("axios");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Hugging Face API settings
const HUGGING_FACE_API_URL =
  "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY; 

async function summarizeText(text) {
  try {
    const response = await axios.post(
      HUGGING_FACE_API_URL,
      {
        inputs: text,
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data[0].summary_text;
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw error;
  }
}

async function extractTextFromPDF(buffer) {
  try {
    const pdfData = await pdfParse(buffer);
    return pdfData.text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw error;
  }
}

app.post("/api/summarize", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const text = await extractTextFromPDF(req.file.buffer);
    const summary = await summarizeText(text);
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the PDF" });
  }
});

app.post("/api/upload-text", async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const summary = await summarizeText(text);
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the text" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
