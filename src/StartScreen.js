import React from "react";

const StartScreen = ({ numQuestions }) => {
  return (
    <div className="start">
      <h2>Welcome to the React quiz</h2>
      <h3>{numQuestions} questions to test your React skills</h3>
      <button className="btn btn-ui">Let's start</button>
    </div>
  );
};

export default StartScreen;
