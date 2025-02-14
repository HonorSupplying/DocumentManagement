const { GoogleAuth } = require("google-auth-library");
const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// ใช้ตัวแปรจาก .env
const PROJECT_ID = process.env.PROJECT_ID;
const LOCATION = process.env.LOCATION || "global";
const DATA_STORE_ID = process.env.DATA_STORE_ID;
let SERVICE_ACCOUNT_KEY = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// ตรวจสอบว่าตั้งค่า GOOGLE_APPLICATION_CREDENTIALS หรือยัง
if (!SERVICE_ACCOUNT_KEY) {
    SERVICE_ACCOUNT_KEY = path.join(__dirname, "credential.json");
    process.env.GOOGLE_APPLICATION_CREDENTIALS = SERVICE_ACCOUNT_KEY;
}

// ตั้งค่า URL ของ Vertex AI Search
const DISCOVERY_ENGINE_API = `https://${LOCATION}-discoveryengine.googleapis.com/v1beta/projects/${PROJECT_ID}/locations/${LOCATION}/collections/default_collection/dataStores/${DATA_STORE_ID}/servingConfigs/default_search:search`;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ ฟังก์ชันรับ JWT Token จาก Google Service Account
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

// ✅ API Endpoint สำหรับ Search
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

// ✅ API Health Check
app.get("/", (req, res) => {
    res.send("Vertex AI Search API is running 🚀");
});

// ✅ Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
