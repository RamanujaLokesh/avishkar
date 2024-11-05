import React, { useEffect, useState } from 'react';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('./api/data/notice');
        if (!response.ok) throw new Error('Failed to fetch notices');
        
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load notices</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Notice Board</h1>
      <div className="space-y-4">
        {notices.map((notice) => {
          const noticeDate = new Date(notice.timestamp);
          const formattedDate = noticeDate.toLocaleDateString();
          
          return (
            <div
              key={notice.id}
              className="p-1 bg-white shadow rounded-lg flex items-center justify-between"
            >
              <div>
                <h2 className="text-sm text-black">
                  {formattedDate} 
                </h2>
              </div>
              <h2 className="text-lg text-black font-semibold">{notice.title}</h2>
              <a
                href={notice.pdf_document}
                className="text-blue-500 hover:underline"
                download
              >
                Download PDF
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NoticeBoard;