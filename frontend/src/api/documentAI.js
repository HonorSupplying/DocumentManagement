// import axios from "axios";

// const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key
// const PROJECT_ID = "YOUR_PROJECT_ID"; // Replace with your Google Cloud project ID
// const PROCESSOR_ID = "YOUR_PROCESSOR_ID"; // Replace with your Document AI processor ID
// const LOCATION = "us"; // Change if using a different region

// export const processDocument = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   const requestBody = {
//     rawDocument: {
//       content: await fileToBase64(file),
//       mimeType: file.type,
//     },
//   };

//   try {
//     const response = await axios.post(
//       `https://${LOCATION}-documentai.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/processors/${PROCESSOR_ID}:process?key=${API_KEY}`,
//       requestBody,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data.document;
//   } catch (error) {
//     console.error("Error processing document:", error);
//     return null;
//   }
// };

// // Helper function to convert file to Base64
// const fileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result.split(",")[1]);
//     reader.onerror = (error) => reject(error);
//   });
// };
