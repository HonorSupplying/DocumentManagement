const express = require("express");
const { DocumentProcessorServiceClient } = require("@google-cloud/documentai").v1;

const app = express();
const PORT = process.env.PORT || 5000;

// Google Cloud Project Details
const projectId = "big-data-ocr-422909"; // Replace with actual project ID
const location = "us"; // or "eu"
const processorId = "your-processor-id"; // Replace with actual processor ID
const client = new DocumentProcessorServiceClient();

app.use(express.json());

// 📌 API Route: Process Document from GCS
app.post("/process-document", async (req, res) => {
    try {
        const { gcsPath } = req.body; // Expecting { "gcsPath": "gs://your-bucket-name/file.pdf" }

        if (!gcsPath) {
            return res.status(400).json({ error: "GCS file path is required" });
        }

        // Document AI Request
        const request = {
            name: `projects/${projectId}/locations/${location}/processors/${processorId}`,
            rawDocument: null, // Not needed since we're using GCS
            gcsDocument: {
                gcsUri: gcsPath,
                mimeType: "application/pdf",
            },
        };

        // Process document with Google Cloud Document AI
        const [response] = await client.processDocument(request);

        res.json({ text: response.document.text });
    } catch (error) {
        console.error("Error processing document:", error);
        res.status(500).json({ error: "Document processing failed" });
    }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
