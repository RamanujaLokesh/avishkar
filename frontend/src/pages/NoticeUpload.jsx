// NoticeUpload.js
import React, { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const NoticeUpload = () => {
  const [title, setTitle] = useState("");
  const [hostelName, setHostelName] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !hostelName || !file) {
      setMessage("Please fill all fields and upload a file.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("hostel_name", hostelName);
      formData.append("pdf_document", file);

      const response = await fetch("/api/notice-board/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Notice uploaded successfully!");
        setTitle("");
        setHostelName("");
        setFile(null);
      } else {
        const error = await response.json();
        setMessage(`Failed to upload notice: ${error.error}`);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <form
          className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            Upload Notice
          </h1>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full mt-2"
              placeholder="Enter the title"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600">
              Hostel Name
            </label>
            <input
              type="text"
              value={hostelName}
              onChange={(e) => setHostelName(e.target.value)}
              className="input input-bordered w-full mt-2"
              placeholder="Enter the hostel name"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600">
              Upload PDF
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="file-input file-input-bordered w-full mt-2"
              required
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Uploading..." : "Upload"}
          </button>

          {message && (
            <div
              className={`mt-4 p-3 text-center rounded-lg ${
                message.includes("success")
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NoticeUpload;
