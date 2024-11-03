import React, { useState } from 'react';
import Card from './card';

function Mealplan() {
  const [selectedMeals, setSelectedMeals] = useState({
    Breakfast: true,
    Lunch: true,
    Snacks: true,
    Dinner: true,
  });

  const mealDescriptions = {
    Breakfast: "Idly with Sambar and Chutney",
    Lunch: "Kadi with Roti and Rice with Aloo Matar",
    Snacks: "Samosa with Hari chutney",
    Dinner: "Mushroom with Roti and Rice, Dal",
  };

  const toggleMealSelection = (mealType) => {
    setSelectedMeals((prevSelectedMeals) => ({
      ...prevSelectedMeals,
      [mealType]: !prevSelectedMeals[mealType],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected meals:", selectedMeals);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold my-6">Meal Planner</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
          className="mt-8 btn btn-primary text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Mealplan;
