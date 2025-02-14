const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;
const fs = require('fs').promises;

const projectId = 'big-data-ocr-422909';  // Replace with your actual Google Cloud Project ID
const location = 'asia-southeast1';                // Replace with 'us' or 'eu' based on your processor location
const processorId = 'your-processor-id'; // Replace with your actual processor ID
const filePath = '/path/to/local/pdf';   // Replace with the path to your PDF file

// Initialize the Document AI client
const client = new DocumentProcessorServiceClient();

async function quickstart() {
  try {
    // Construct the full processor resource name
    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

    // Read the PDF file into memory
    const imageFile = await fs.readFile(filePath);
    const encodedImage = Buffer.from(imageFile).toString('base64');

    // Create request for Document AI
    const request = {
      name,
      rawDocument: {
        content: encodedImage,
        mimeType: 'application/pdf',
      },
    };

    // Process the document
    const [result] = await client.processDocument(request);
    const { document } = result;

    console.log('Document text:');
    console.log(document.text);

    // Extract paragraphs from the document
    if (document.pages.length > 0) {
      console.log('\nExtracted Paragraphs:');
      for (const page of document.pages) {
        for (const paragraph of page.paragraphs || []) {
          console.log(paragraph.layout.textAnchor ? document.text.substring(paragraph.layout.textAnchor.textSegments[0].startIndex, paragraph.layout.textAnchor.textSegments[0].endIndex) : '');
        }
      }
    }
  } catch (error) {
    console.error('Error processing document:', error.message);
  }
}

// Run the function
quickstart();
