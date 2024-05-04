import React from "react";

const Progress = ({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}) => {
  return (
    <div className="progress">
      <progress
        value={index + Number(answer !== null)}
        max={numQuestions}
      ></progress>
      <p>
        Question <strong>{index + 1} </strong>/ {numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </div>
  );
};

export default Progress;
