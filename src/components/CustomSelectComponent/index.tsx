import React, { useState } from "react";
import "./CustomSelectComponent.scss";
import CheckMark from "../../public/CheckMark.svg";
interface CustomSelectProps {
  options: number[];
  selectedOption: number;
  onChange: (value: number) => void;
}

const CustomSelectComponent: React.FC<CustomSelectProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: number) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`custom-select ${isOpen ? "open" : ""}`}>
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}%
      </div>
      {isOpen && (
        <ul className="options">
          {options.map((option) =>
            selectedOption == option ? (
              <li
                className="option"
                key={option}
                onClick={() => handleOptionClick(option)}
              >
                {option}%{" "}
                {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="17"
                    height="17"
                    className="CheckMark"
                    viewBox="0 0 26 26"
                  >
                    <path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"></path>
                  </svg>
                }
              </li>
            ) : (
              <li
                className="option"
                key={option}
                onClick={() => handleOptionClick(option)}
              >
                {option}%
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomSelectComponent;
