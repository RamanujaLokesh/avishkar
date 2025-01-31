import React, { useEffect, useState } from "react";

const NoticeBoard = ({ hostel }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  const fetchNotices = async () => {
    try {
      let response = await fetch(`/api/data/notice?hostel=${hostel}`);
  

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setNotices(data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [hostel]);

  const handleDownload = (pdfUrl, filename) => {
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center space-x-2">
          <span className="loading loading-spinner"></span>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 font-semibold">
          Failed to load notices: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Notice Board
      </h1>
      <div className="space-y-6">
        {notices.length > 0 ? (
          notices.map((notice) => {
            const noticeDate = new Date(notice.timestamp);
            const formattedDate = noticeDate.toLocaleDateString();
            const formattedTime = noticeDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={notice.id}
                className="p-6 bg-white rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center justify-between"
              >
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="text-gray-500 text-sm mb-2 sm:mb-0 sm:mr-6">
                    <p>{formattedDate}</p>
                    <p>{formattedTime}</p>
                  </div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {notice.title}
                  </h2>
                </div>
                <button
                  onClick={() =>
                    handleDownload(notice.pdf_document, notice.title + ".pdf")
                  }
                  className="mt-4 sm:mt-0 text-blue-600 hover:text-blue-800 hover:underline text-sm font-semibold"
                >
                  {notice.pdf_document ? "Open PDF" : "No PDF Available"}
                </button>
              </div>
            );
          })
        )
         : (
          <p className="text-center text-gray-600">
            No notices available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;
