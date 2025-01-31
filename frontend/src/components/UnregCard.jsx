import React from 'react';

const UnregCard = ({ student }) => {
  let meals = [];
  if(student.breakfast === false) meals = [...meals, "breakfast"];
  if(student.lunch === false) meals = [...meals, "lunch"];
  if(student.snacks === false) meals = [...meals, "snacks"];
  if(student.dinner === false) meals = [...meals, "dinner"];

  return (
    <div>
      {student.reg_no + " "}
      {meals.map((meal, index) => (
        <span key={index} className='p-6'>{meal} </span>
      ))}
    </div>
  );
}

export default UnregCard;
