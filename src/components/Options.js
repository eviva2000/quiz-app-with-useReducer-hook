import React from "react";

const Options = ({ options }) => {
  return (
    <div className="options">
      {options.map((option, index) => {
        return (
          <button key={index} className="btn btn-option">
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
