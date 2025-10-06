const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const response = await axios.post("http://localhost:5000/chat", { message: userMessage });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error forwarding request to Python backend" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Node.js backend listening on port ${PORT}`);
});
