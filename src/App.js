import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
const App = () => {
  const initialState = {
    questions: [],

    //'loading', 'error,' 'ready', 'active', 'finished'
    status: "loading",
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
      default:
        throw new Error("Invalid action type");
    }
  };

  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
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
        {status === "ready" && <StartScreen numQuestions={numQuestions} />}
      </Main>
    </div>
  );
};

export default App;
