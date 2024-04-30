import React from "react";
import Options from "./Options";

const Question = ({ question }) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options options={question.options} />
    </div>
  );
};

export default Question;
