import React from 'react';

const MessCard = ({ presentMeal }) => {

  return (
    <div
      className="card shadow-lg rounded-lg transform transition duration-300 ease-in-out m-2 bg-green-100 border border-green-500 text-green-700 "
    >
      <div className="card-body items-center text-center p-6">
        <p className="pb-3 text-xl font-semibold">{presentMeal}</p>
      </div>
    </div>
  );
};

export default MessCard;
