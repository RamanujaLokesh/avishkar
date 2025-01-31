import React, { useEffect, useState } from "react";
import useUnRegStudents from "../hooks/useUnRegStudents";
import { useAuthContext } from "../context/AuthContext";
import UnregCard from "../components/UnregCard";
import SelectHostel from "../components/SelectHostel";

const UnRegStudents = () => {
  const { authUser } = useAuthContext();
  const { loading, unRegStudents } = useUnRegStudents();
  const [data, setData] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(authUser.hostel);
  const [mealCounts, setMealCounts] = useState({
    breakfast: 0,
    lunch: 0,
    snacks: 0,
    dinner: 0,
  });

  const calculateMealCounts = (students) => {
    const counts = { breakfast: 0, lunch: 0, snacks: 0, dinner: 0 };
    students?.forEach((student) => {
      if (!student.breakfast) counts.breakfast++;
      if (!student.lunch) counts.lunch++;
      if (!student.snacks) counts.snacks++;
      if (!student.dinner) counts.dinner++;
    });
    return counts;
  };

  const fetchData = async (hostel) => {
    try {
      const students = await unRegStudents(hostel);
      if (students.error) {
        setData([]);
        setMealCounts({ breakfast: 0, lunch: 0, snacks: 0, dinner: 0 });
      } else {
        setData(students);
        setMealCounts(calculateMealCounts(students));
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setData([]);
      setMealCounts({ breakfast: 0, lunch: 0, snacks: 0, dinner: 0 });
    }
  };

  useEffect(() => {
    if (authUser.auth_level < 3) {
      fetchData(authUser.hostel);
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser.auth_level === 3 && selectedHostel) {
      fetchData(selectedHostel);
    }
  }, [selectedHostel, authUser.auth_level]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Unregistered Students
      </h1>

      {authUser.auth_level === 3 && (
        <div className="mb-6">
          <SelectHostel onSelectHostel={setSelectedHostel} />
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="flex items-center space-x-2">
            <span className="loading loading-spinner"></span>
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      ) : (
        <div>
          {data.length > 0 ? (
            <>
              <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  Meal Counts
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  {Object.entries(mealCounts).map(([meal, count]) => (
                    <div key={meal} className="p-4 bg-blue-100 rounded-lg">
                      <p className="font-bold text-xl text-blue-600">{count}</p>
                      <p className="text-gray-600 capitalize">{meal}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((student, index) => (
                  <UnregCard key={index} student={student} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600">No unregistered students found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UnRegStudents;
