import React, { useState, useEffect } from "react";
import Card from "./Card";
import useUnregisterMeal from "../hooks/useUnregisterMeal";
import { useAuthContext } from "../context/AuthContext";
import useUserMeals from "../hooks/useUserMeals";

const Mealplan = () => {
  const { authUser } = useAuthContext();
  const [mealDescriptions, setMealDescriptions] = useState({});
  const { loading, unregisterMeal } = useUnregisterMeal();
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: true,
    lunch: true,
    snacks: true,
    dinner: true,
  });

  const { userMeals } = useUserMeals();

  useEffect(() => {
    const fetchUserMeals = async () => {
      try {
        const predata = await userMeals();
        if (predata && !predata.message) {
          setSelectedMeals(predata);
        }
      } catch (error) {
        console.error("Failed to fetch user meals:", error);
      }
    };

    fetchUserMeals();
  }, []);

  useEffect(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayName = days[(today.getDay() + 1) % 7];

    const fetchMealDescriptions = async () => {
      try {
        const response = await fetch(`/api/data/getdaymenu?hostel=SVBH&day=${dayName}`);
        const data = await response.json();
        const mealData = data[0];
        setMealDescriptions({
          breakfast: mealData.breakfast,
          lunch: mealData.lunch,
          snacks: mealData.snacks,
          dinner: mealData.dinner,
        });
      } catch (error) {
        console.error("Failed to fetch meal data:", error);
      }
    };

    fetchMealDescriptions();
  }, []);

  const toggleMealSelection = (mealType) => {
    setSelectedMeals((prev) => ({
      ...prev,
      [mealType]: !prev[mealType],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    unregisterMeal({ reg_no: authUser.reg_no, ...selectedMeals });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-200">
      <h1 className="text-4xl font-semibold mb-6 text-gray-800">Meal Planner</h1>
      {Object.keys(mealDescriptions).length > 0 ? (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.keys(mealDescriptions).map((mealType) => (
              <Card
                key={mealType}
                mealType={mealType}
                mealDescription={mealDescriptions[mealType]}
                isSelected={selectedMeals[mealType]}
                onClick={() => toggleMealSelection(mealType)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="mt-8 btn btn-primary w-full md:w-auto mx-auto text-lg hover:bg-blue-600 transition-colors"
          >
            {loading ? <span className="loading loading-spinner"></span> : "Submit"}
          </button>
        </form>
      ) : (
        <p className="text-lg text-gray-500">Loading meal descriptions...</p>
      )}

      <div className="mt-8 p-4 bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Instructions:</h2>
        <ul className="list-disc ml-6 text-gray-600">
          <li className="mb-2">
            By default, all meal preferences are set to <strong>"Yes"</strong>, indicating that you wish to have all four meals (Breakfast, Lunch, Snacks, Dinner) tomorrow.
          </li>
          <li className="mb-2">
            If you do not want any specific meal, please change the option to <strong>"No"</strong> for that particular meal by clicking on it.
          </li>
          <li className="mb-2">
            Make sure to review your selections before submitting the form to avoid any mistakes.
          </li>
          <li className="mb-2">
            Submitting this form accurately helps us plan and reduce food waste.
          </li>
          <li className="mb-2">
            If you are not having meals for an extended period, please consult the respective authority.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Mealplan;
