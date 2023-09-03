// import React from 'react'

import { useEffect } from "react";
import { useSelector } from "react-redux";
import QuestionBox from "./QuestionBox";
import Navigation from "./Navigation";
import Header from "./Header";
import Footer from "./Footer";

const QuizApp = () => {
  const { activeQuestion } = useSelector((state) => state.user);

 

  return (
    <div className="quiz_app_main">
      <Navigation />
      <div className="content">
        <Header />
        {/* <div className="question_container"> */}
        {<QuestionBox activeQuestion={activeQuestion} />}
        {/* </div> */}
        <Footer />
      </div>
    </div>
  );
};

export default QuizApp;
