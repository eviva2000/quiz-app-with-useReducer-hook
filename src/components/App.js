import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "../Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import { NextButton } from "./NextButton";

const App = () => {
  const initialState = {
    questions: [],

    //'loading', 'error,' 'ready', 'active', 'finished'
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "dataRecieved":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFailed":
        return {
          ...state,
          status: "error",
        };
      case "start":
        return {
          ...state,
          status: "active",
        };
      case "newAnswer":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      default:
        throw new Error("Invalid action type");
    }
  };

  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const getQuestions = async () => {
    try {
      const response = await fetch("http://localhost:8000/questions");
      const data = await response.json();
      dispatch({ type: "dataRecieved", payload: data });
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);

  const numQuestions = questions.length;
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            {" "}
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
};

export default App;
