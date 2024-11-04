import React from 'react';

const Card = ({ mealType, mealDescription, isSelected, onClick }) => {
  return (
    <div
      className={`card shadow-md cursor-pointer transform transition duration-300 ease-in-out hover:-translate-y-1 ${
        isSelected ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-base-100 border border-gray-300'
      }`}
      onClick={onClick}
    >
      <div className="card-body items-center text-center p-4">
        <h3 className="card-title text-lg font-semibold">{mealType}</h3>
        <p className="mt-2">
          <strong>Meal:</strong> {mealDescription}
        </p>
      </div>
    </div>
  );
};

export default Card;