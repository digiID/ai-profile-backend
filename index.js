require('dotenv').config();
const express = require('express');
const Replicate = require('replicate');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

app.post('/generate', async (req, res) => {
  try {
    const output = await replicate.run(
      "stability-ai/stable-diffusion-3",
      {
        input: {
          prompt: "a professional headshot portrait of a confident young entrepreneur in studio lighting"
        }
      }
    );

    res.json({ output });
  } catch (error) {
    console.error("❌ ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("✅ Server is running at http://localhost:3000");
});

