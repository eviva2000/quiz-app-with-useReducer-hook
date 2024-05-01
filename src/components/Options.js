import React from "react";

const Options = ({ question, dispatch, answer }) => {
  console.log(answer);
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            key={index}
            className={`btn btn-option  ${index === answer ? "answer" : ""} ${
              answer !== null
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={answer !== null}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
