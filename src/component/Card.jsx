import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ icon, title, link, options }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  // Determine the initial label based on title
  const getDropdownLabel = () => {
    if (selectedOption) return selectedOption;

    switch (title) {
      case 'Total Doctors':
        return 'Select Doctor';
      case 'Total Patients':
      case 'Appointments':
        return 'Select Time Range';
      case 'Total Revenue':
        return 'Select Amount';
      default:
        return 'Select Option';
    }
  };

  // Handle card click to navigate
  const handleCardClick = () => {
    if (link && !dropdownOpen) {
      navigate(link);
    }
  };

  // Handle dropdown option click
  const handleOptionClick = (option) => {
    console.log(`Selected: ${option}`);
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-105 h-[200px] relative"
      onClick={handleCardClick}
    >
      <div className="flex items-center space-x-3">
        <div>{icon}</div>
        <div className="text-lg font-semibold">{title}</div>
      </div>

      {/* Dropdown */}
      {options && (
        <div className="mt-4 relative">
          <button
            className="bg-gray-100 p-3 rounded-md text-sm w-full text-left"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen((prev) => !prev);
            }}
          >
            {getDropdownLabel()}
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-full max-h-40 overflow-y-auto bg-white shadow-lg rounded-md z-10">
              {options.map((option, i) => (
                <button
                  key={i}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 rounded-md"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    handleOptionClick(option);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
