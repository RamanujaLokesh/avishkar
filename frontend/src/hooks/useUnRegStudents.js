import { useState } from "react";
import toast from "react-hot-toast";

const useUnRegStudents = () => {
  const [loading, setLoading] = useState(false);

  const unRegStudents = async (hostel) => {
    setLoading(true); // Set loading to true when the request starts
    try {
      const res = await fetch(`/api/data/unregstudents/${hostel}`);
      const data = await res.json();

      if (data.message) {
        toast.error(data.message);
      } else {
        return data;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
  };

  return { loading, unRegStudents };
};

export default useUnRegStudents;
