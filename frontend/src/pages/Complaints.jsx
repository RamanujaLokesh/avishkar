import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import SelectHostel from "../components/SelectHostel";

const Complaints = () => {
  const { authUser } = useAuthContext();
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHostel, setSelectedHostel] = useState(authUser.hostel);

  const onSelectHostel = (hostel) => {
    setSelectedHostel(hostel);
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          `api/complaints/fetchall/${selectedHostel}`
        );
        if (response.ok) {
          const data = await response.json();
          if (!data.message) setComplaints(data);
          console.log(data);
        } else {
          throw new Error("Failed to fetch complaints");
        }
      } catch (err) {
        console.error("Error fetching complaints:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedHostel !== "All") {
      fetchComplaints();
    }
  }, [selectedHostel]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl text-gray-700 font-bold text-center mb-6">Complaint List</h1>

        {/* Render SelectHostel when authUser.auth_level is 3 */}
        {authUser.auth_level === 3 && (
          <div className="mb-4">
            <SelectHostel
              hostel={selectedHostel}
              onSelectHostel={onSelectHostel}
            />
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner text-blue-500"></span>
          </div>
        ) : complaints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complaints.map((complaint) => (
              <div
                key={complaint.complaint_id}
                className="bg-white shadow-lg rounded-lg p-4"
              >
                <p className="text-sm text-gray-800 mb-4">
                  {complaint.reg_no}
                </p>
                <p className="text-sm text-red-600 mb-4">
                  {complaint.complaint}
                </p>

                <span className="text-xs text-gray-500">
                  {new Date(complaint.time).toLocaleDateString("en-CA")}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No complaints found.</div>
        )}
      </div>
    </div>
  );
};

export default Complaints;
