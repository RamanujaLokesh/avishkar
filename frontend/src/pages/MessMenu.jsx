import React, { useState, useEffect } from "react";
import MessCard from "../components/MessCard";
import SelectHostel from "../components/SelectHostel";
import { useAuthContext } from "../context/AuthContext";

const MessMenu = () => {
  const { authUser } = useAuthContext();
  const [mealData, setMealData] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState(authUser.hostel);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editableData, setEditableData] = useState(null);

  const mealDay = ["Breakfast", "Lunch", "Snacks", "Dinner"];


  useEffect(() => {
    if (selectedHostel !== "All") {
      const fetchMess = async () => {
        try {
          const fetchdata = await fetch(`/api/data/getmenu?hostel=${selectedHostel}`);
          const res = await fetchdata.json();
          console.log(res);
          setMealData(res);
        } catch (err) {
          console.error("Error while fetching menu", err);
        }
      };
      fetchMess();
    }
  }, [selectedHostel]);
 

  const handleHostelChange = (hostel) => {
    setSelectedHostel(hostel);
  };

  const handleEdit = (index) => {
    setEditRowIndex(index);
    setEditableData(mealData[index]);
  };

  const handleSave = (index) => {
    const updatedMealData = [...mealData];
    updatedMealData[index] = editableData;
    setMealData(updatedMealData);
    setEditRowIndex(null);

    // Send updated data to the server, including day and hostel
    const updateMenu = async () => {
      try {
        await fetch(`/api/data/updatemenu`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editableData,
            day: mealData[index].day,
            hostel: selectedHostel,
          }),
        });
      } catch (error) {
        console.error("Error updating menu:", error);
      }
    };
    updateMenu();
  };

  const handleChange = (e, mealType) => {
    setEditableData({
      ...editableData,
      [mealType]: e.target.value,
    });
  };

  if (!mealData.length ) {
if(selectedHostel==='All'){

  return (
    <div className=" h-screen">
        <div>
          <h1 className="flex items-center justify-center text-3xl text-gray-900 font-bold pt-4 pb-4">
            Mess Menu
          </h1>
        </div>
        <SelectHostel onSelectHostel={handleHostelChange} />
      </div>
    );
  }else{
    return(
      < div className="h-screen flex items-center justify-center">
        
          <h1 className="font-extrabold">No menu found</h1>
      
      </div>
    )
  }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className=" text-black py-4">
        <h1 className="text-3xl font-bold text-center">Mess Menu</h1>
      </div>

      {/* Select Hostel Dropdown */}
      {authUser.auth_level === 3 && (
        <div className="my-4">
        <SelectHostel onSelectHostel={handleHostelChange} />
        </div>
      )}

      <div className="container mx-auto p-4">
        {(!mealData.length || selectedHostel === "All")?(
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg font-semibold text-gray-700">Loading...</p>
            </div>
        ):(

      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="p-2 bg-white text-gray-800 text-left">Day</th>
              {mealDay.map((meal, index) => (
                <th key={index} className="p-2 text-middle bg-white text-gray-700">
                  {meal}
                </th>
              ))}
              {authUser.auth_level > 1 && <th className="p-2 bg-white  text-left text-gray-700">Edit</th>}
            </tr>
          </thead>
          <tbody>
            {mealData.map((dayMeals, dayIndex) => {
              const isEditing = editRowIndex === dayIndex;

              return (
                <tr
                  key={dayIndex}
                  className={`${dayIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="p-2 text-gray-700">{dayMeals.day}</td>
                  {mealDay.map((meal, index) => (
                    <td key={index} className="p-2 text-center">
                      {isEditing ? (
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          value={editableData[meal.toLowerCase()]}
                          onChange={(e) => handleChange(e, meal.toLowerCase())}
                        />
                      ) : (
                        <MessCard presentMeal={dayMeals[meal.toLowerCase()]} />
                      )}
                    </td>
                  ))}
                  {authUser.auth_level > 1 && (
                    <td className="p-2 text-center">
                      {isEditing ? (
                        <button
                          onClick={() => handleSave(dayIndex)}
                          className="text-green-600 hover:text-green-800 font-semibold"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(dayIndex)}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
        )}
    </div>
    </div>
  );
};

export default MessMenu;
