import React from "react";

const FinishScreen = ({ points, maxPossiblePoints, dispatch }) => {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥳";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 60) emoji = "👍";
  else emoji = "🤔";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> Your scour is <strong>{points}</strong> out of{" "}
        <strong>{maxPossiblePoints}</strong> ({Math.ceil(percentage)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </button>
    </>
  );
};

export default FinishScreen;
