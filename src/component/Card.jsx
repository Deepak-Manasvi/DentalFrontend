import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ icon, title, link, options }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle card click to navigate
  const handleCardClick = () => {
    if (link && !dropdownOpen) { // Don't navigate if dropdown is open
      navigate(link);
    }
  };

  // Handle dropdown option click
  const handleOptionClick = (option) => {
    console.log(`Selected: ${option}`);
    setDropdownOpen(false); // Close dropdown after selecting an option
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-105 h-[200px] relative" // Added relative positioning for card
      onClick={handleCardClick}
    >
      <div className="flex items-center space-x-3">
        {/* Align icon and title closely */}
        <div>{icon}</div>
        <div className="text-lg font-semibold">{title}</div>
      </div>

      {/* Conditional rendering for dropdown */}
      {options && (
        <div className="mt-4 relative"> {/* Added relative positioning for dropdown container */}
          <button
            className="bg-gray-100 p-3 rounded-md text-sm w-full text-left"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card navigation on dropdown button click
              setDropdownOpen(!dropdownOpen);
            }}
          >
            Select Time Range
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-full max-h-40 overflow-y-auto bg-white shadow-lg rounded-md"> {/* Absolute positioning for dropdown */}
              {options.map((option, i) => (
                <button
                  key={i}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 rounded-md"
                  onClick={() => handleOptionClick(option)}
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
