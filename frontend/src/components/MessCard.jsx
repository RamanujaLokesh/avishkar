import React from 'react';

const MessCard = ({ presentMeal }) => {


  return (
    <div
      className={'card shadow-md rounded-lg transform  ease-in-out  m-2 bg-green-100 border border-green-500 text-green-700' 
      }
    >
      <div className="card-body items-center text-center p-4">
      
        <p className=" pb-1">
           {presentMeal}
        </p>
      </div>
    </div>
  );
};

export default MessCard;