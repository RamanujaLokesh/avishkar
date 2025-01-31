import React, { useState, useEffect } from 'react';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch('api/complaints/fetch');

                if (response.ok) {
                    const data = await response.json();
                    setComplaints(data);
                } else {
                    throw new Error('Failed to fetch complaints');
                }
            } catch (err) {
                console.error('Error fetching complaints:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="loader"></div> 
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            {complaints.length === 0 ? (
                <p className="text-center text-gray-500">No complaints found</p>
            ) : (
                complaints.map((complaint) => (
                    <div
                        key={complaint.complaint_id}
                        className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-all"
                    >
                        <p className="font-semibold text-gray-700">{complaint.complaint}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            <strong>Submitted on:</strong> {new Date(complaint.time).toLocaleString()}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ComplaintList;
