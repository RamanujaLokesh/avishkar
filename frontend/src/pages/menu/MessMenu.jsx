import React, { useState, useEffect } from 'react';
import MessCard from '../../components/MessCard';

const MessMenu = () => {
  const [mealData, setMealData] = useState([]);
  const mealDay = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  useEffect(() => {
    const fetchMess = async () => {
      try {
        const fetchdata = await fetch('/api/data/getmenu');
        const res = await fetchdata.json();
        console.log(res);
        setMealData(res);
      } catch (err) {
        console.log('Error while fetching menu', err);
      }
    };

    fetchMess();
  }, []);

  if (!mealData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-screen'>
      <div>
        <h1 className='flex items-center justify-center text-3xl font-bold pt-4 pb-4'>Mess Menu</h1>
      </div>
      <div className='flex justify-center'>
        <table className='table-auto'>
          <thead>
            <tr>
              <th className='p-2'>Day</th>
              {mealDay.map((meal, index) => (
                <th key={index} className='p-2'>{meal}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealData.map((dayMeals, dayIndex) => (
              <tr key={dayIndex}>
                <td className='p-2'>{dayMeals.day}</td>
                <td className='p-2'><MessCard presentMeal={dayMeals.breakfast} /></td>
                <td className='p-2'><MessCard presentMeal={dayMeals.lunch} /></td>
                <td className='p-2'><MessCard presentMeal={dayMeals.snacks} /></td>
                <td className='p-2'><MessCard presentMeal={dayMeals.dinner} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessMenu;