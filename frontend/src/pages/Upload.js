import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [filesData, setFilesData] = useState([]); // State to hold uploaded files data

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    setUploading(true);
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Replace this URL with the URL of your backend's upload endpoint
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`File uploaded successfully: ${result.message}`);

        // Update files data state after successful upload
        setFilesData((prevData) => [
          ...prevData,
          {
            name: file.name,
            size: file.size,
            date: new Date().toLocaleString(),
          },
        ]);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Upload File</h2>

      {/* File Upload Section */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="mb-4">
                <label htmlFor="fileUpload" className="form-label">
                  Choose a file to upload
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="fileUpload"
                  onChange={handleFileChange}
                  disabled={uploading} // Disable input during upload
                />
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handleFileUpload}
                disabled={uploading || !file} // Disable button if uploading or no file selected
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
              {/* Display feedback message */}
              {message && (
                <div className="mt-3 alert alert-info">{message}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="my-5"></div>

      {/* Data Table Section */}
      <h3 className="text-center mb-4">➟UPLOADED</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size (KB)</th>
              <th>Uploaded At</th>
            </tr>
          </thead>
          <tbody>
            {filesData.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  No files uploaded yet.
                </td>
              </tr>
            ) : (
              filesData.map((file, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{(file.size / 1024).toFixed(2)}</td> {/* Size in KB */}
                  <td>{file.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Upload;
