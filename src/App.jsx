// import { useState } from 'react'
import "./App.css";
import QuizApp from "./component/QuizApp";
import { Routes, Route } from "react-router-dom";
import Result from "./component/Result";

import { updateEmail, getAllQuestionData } from "./features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {  useState } from "react";
import ConfirmNavigation from "./component/ConfirmNavigation";
import { getEmailValidate, shuffle } from "./utility/base";

function App() {
  const dispatch = useDispatch();
  const { email, allQuestionData } = useSelector((state) => state.user);
  const [emailValidation, setEmailValidation] = useState(email);
  const [emailState, setEmailState] = useState("");
  const [loading, setLoading] = useState(false);
  // const [showNavigation, setShowNavigation] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://opentdb.com/api.php?amount=15");
      const data = await response.json();
      if (data?.results) {
        const updatedResults = data.results.map((item, index) => ({
          ...item,
          answers: shuffle([...item?.incorrect_answers, item?.correct_answer]),
        }));
        dispatch(getAllQuestionData([...updatedResults, ...updatedResults]));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEmail = () => {
    if (getEmailValidate(emailState)) {
      setLoading(true);
      setEmailValidation(true);

      fetchData();
      dispatch(updateEmail(emailState));
    } else {
      setEmailValidation(false);
    }
  };

  // useEffect(() => {
  //   if (allQuestionData?.length) {
  //     console.log("all : ", allQuestionData);
  //   }
  // }, [allQuestionData]);

  // console.log("email : ", email);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            emailValidation && allQuestionData?.length ? (
              <QuizApp />
            ) : (
              <>
                <div className="email_container">
                  <div className="email_wrapper">
                    <h3>Please Enter Your Email</h3>
                    <input
                      type="email"
                      name="email"
                      value={emailState}
                      onChange={(e) => setEmailState(e.target.value)}
                    />
                  </div>
                  <button
                    className="submitEmail pointer"
                    onClick={() => {
                      setLoading(true);
                    }}
                  >
                    Next
                  </button>
                </div>
                {loading ? (
                  <ConfirmNavigation
                    text={"Are you want to start the test?"}
                    denyText={"Back"}
                    submitText={"Start"}
                    setLoading={setLoading}
                    submitHandler={handleSubmitEmail}
                  />
                ) : (
                  ""
                )}
              </>
            )
          }
        />
        <Route path="/result" element={<Result />} />
        {/* <Route path='/result' element={} /> */}
      </Routes>
    </>
  );
}

export default App;
