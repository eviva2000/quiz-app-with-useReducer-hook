import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "../Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import { NextButton } from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
const App = () => {
  const SECS_PER_QUESTION = 30;
  const initialState = {
    questions: [],
    //'loading', 'error,' 'ready', 'active', 'finished'
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    secondRemaining: null,
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
          secondRemaining: state.questions.length * SECS_PER_QUESTION,
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
      case "finish":
        return {
          ...state,
          status: "finished",
        };
      case "reset":
        return {
          ...initialState,
          questions: state.questions,
          status: "ready",
        };
      case "timeUp":
        return {
          ...state,
          secondRemaining: state.secondRemaining - 1,
          status: state.secondRemaining === 0 ? "finished" : state.status,
        };

      default:
        throw new Error("Invalid action type");
    }
  };

  const [
    { questions, status, index, answer, points, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
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
  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
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
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
