import { useState, useEffect } from 'react';
import Card from './card';
import useUnregisterMeal from '../hooks/useUnregisterMeal';
import { useAuthContext } from '../context/AuthContext';
import useUserMeals from '../hooks/useUserMeals';

const Mealplan = () => {
  const { authUser } = useAuthContext();
  const [mealDescriptions, setMealDescriptions] = useState({});
  const { loading, unregisterMeal } = useUnregisterMeal();
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: false,
    lunch: false,
    snacks: false,
    dinner: false,
  });

  const { userMeals } = useUserMeals(); // Ensure userMeals is async function returning data

  useEffect(() => {
    const fetchUserMeals = async () => {
      try {
        const predata = await userMeals();
        if (predata && !predata.message) {
          setSelectedMeals(predata);
        }
      } catch (error) {
        console.error('Failed to fetch user meals:', error);
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
        const transformedMealDescriptions = {
          breakfast: mealData.breakfast,
          lunch: mealData.lunch,
          snacks: mealData.snacks,
          dinner: mealData.dinner,
        };
        setMealDescriptions(transformedMealDescriptions);
      } catch (error) {
        console.error('Failed to fetch meal data:', error);
      }
    };

    fetchMealDescriptions();
  }, []);

  const toggleMealSelection = (mealType) => {
    setSelectedMeals((prevSelectedMeals) => ({
      ...prevSelectedMeals,
      [mealType]: !prevSelectedMeals[mealType],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    unregisterMeal({ reg_no: authUser.reg_no, ...selectedMeals });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold my-6">Meal Planner</h1>
      {Object.keys(mealDescriptions).length > 0 ? (
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
          <button type="submit" className="mt-8 btn btn-primary text-lg">
            {loading ? <span className='loading loading-spinner'></span> : "Submit"}
          </button>
        </form>
      ) : (
        <p>Loading meal descriptions...</p>
      )}
    </div>
  );
};

export default Mealplan;
