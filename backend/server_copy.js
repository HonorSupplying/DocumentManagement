const { GoogleAuth } = require("google-auth-library");
const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Google Cloud Storage setup
const storage = new Storage();
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

// Multer setup for handling file uploads in memory
const upload = multer({ storage: multer.memoryStorage() });

// Environment Variables
const PROJECT_ID = process.env.PROJECT_ID;
const LOCATION = process.env.LOCATION || "global";
const DATA_STORE_ID = process.env.DATA_STORE_ID;
let SERVICE_ACCOUNT_KEY = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!SERVICE_ACCOUNT_KEY) {
    SERVICE_ACCOUNT_KEY = path.join(__dirname, "credential.json");
    process.env.GOOGLE_APPLICATION_CREDENTIALS = SERVICE_ACCOUNT_KEY;
}

// Vertex AI Search URL
const DISCOVERY_ENGINE_API = `https://${LOCATION}-discoveryengine.googleapis.com/v1beta/projects/${PROJECT_ID}/locations/${LOCATION}/collections/default_collection/dataStores/${DATA_STORE_ID}/servingConfigs/default_search:search`;

// Middleware setup
app.use(express.json());
app.use(cors());

// Function to get Google Cloud access token
async function getAccessToken() {
    try {
        const auth = new GoogleAuth({
            scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });
        const client = await auth.getClient();
        return await client.getAccessToken();
    } catch (error) {
        console.error("Error fetching access token:", error);
        throw new Error("Failed to authenticate with Google Cloud");
    }
}

// Search endpoint for Vertex AI
app.post("/search", async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return res.status(400).json({ error: "Query is required" });

        const token = await getAccessToken();
        const response = await axios.post(
            DISCOVERY_ENGINE_API,
            { query, pageSize: 10 },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Search error:", error.response?.data || error.message);
        res.status(500).json({ error: "Search request failed" });
    }
});

// Health check for the API
app.get("/", (req, res) => {
    res.send("Vertex AI Search API is running 🚀");
});

// ✅ File upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const fileName = `${Date.now()}_${req.file.originalname}`;
        const file = bucket.file(fileName);

        // Upload the file to Google Cloud Storage
        await file.save(req.file.buffer, {
            metadata: { contentType: req.file.mimetype },
        });

        // Generate public URL
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        res.status(200).json({
            message: "File uploaded successfully",
            url: publicUrl,
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "File upload failed" });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
