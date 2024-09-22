const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse incoming request body
app.use(bodyParser.json());

// Route to handle the call
app.post("/call-chat-model", async (req, res) => {
  try {
    const { chatQuery, model } = req.body;

    // Prepare the request payload
    const obj = {
      chatQuery: chatQuery || "Who are you?",
      model: model || "o1-preview",
    };

    // Make the request to Phala IPFS service
    const response = await axios.post(
      ` https://wapo-testnet.phala.network/ipfs/Qmd3Jdu1K8FWPBoiJ6k9QuDJbnH3ZivC97aFnEfwzG7PXC`,
      obj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Send the response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while calling Phala service" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
