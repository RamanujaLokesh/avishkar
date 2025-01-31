// Dropdown.js
import React, { useState } from 'react';

const SelectHostel = ({ onSelectHostel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

const options = [
    'SVBH',
    'Patel',
    'Tilak',
    'Tandon',
    'Malviya',
    'NBH',
    'Raman',
    'Tagore',
    'PG Girls',
    'DJGH',
    'KNGH',
    'SNGH',
    'IHB']
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelectHostel(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={toggleDropdown}
        >
          {selectedOption || 'Select an option'}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.832.445l3 4a1 1 0 01-1.664 1.11L10 5.336 7.832 8.555a1 1 0 11-1.664-1.11l3-4A1 1 0 0110 3zm0 7a1 1 0 01.832.445l3 4a1 1 0 01-1.664 1.11L10 12.336 7.832 15.555a1 1 0 11-1.664-1.11l3-4A1 1 0 0110 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectHostel;
