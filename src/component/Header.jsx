import { useEffect, useState } from "react";
// import React from 'react'
import { LuTimer } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {RxHamburgerMenu} from 'react-icons/rx';
import {
  updateCorrectAnswer,
  updateIncorrectAnswer,
} from "../features/user/userSlice";
import ConfirmNavigation from "./ConfirmNavigation";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allQuestionData } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    let numberOfCorrectAns = 0;
    let numberOfIncorrectAns = 0;

    allQuestionData.map((item, index) => {
      // console.log(item?.userAns == item.correct_answer);
      if (item?.userAns && item?.userAns == item.correct_answer) {
        numberOfCorrectAns++;
      } else if (item?.userAns && item?.userAns != item.correct_answer) {
        numberOfIncorrectAns++;
      }
    });

    let questionsLeft =
      allQuestionData.length - (numberOfCorrectAns + numberOfIncorrectAns);
    // let numberOfIncorrectAns = allQuestionData.length - numberOfCorrectAns;

    dispatch(updateCorrectAnswer(numberOfCorrectAns));
    dispatch(updateIncorrectAnswer(numberOfIncorrectAns));

    // console.log(
    //   "submit : ",
    //   numberOfCorrectAns,
    //   numberOfIncorrectAns,
    //   questionsLeft
    // );

    // navigate to result page
    // let {id} = useParams();
    navigate(`/result`);
  };
  const [minutes, setMinutes] = useState(0); // Set the initial number of minutes
  const [seconds, setSeconds] = useState(5); // Set the initial number of seconds

  const Timer =()=>{
    return (
      <div className="timer_box">
        <div className="timer_box_icon">
          <LuTimer />
        </div>
        <div className="timer_box_wrapper">
          <p className="small_text">Test Time</p>
          <p className="time_text">
            {minutes}:{seconds}
          </p>
        </div>
      </div>
    );
  }

  const showNavigationHandler = (e)=>{
    e.preventDefault();
    let elem = document.querySelector('.navigation');
    if(!elem.classList.contains('hidden')){
      elem.classList.add('hidden');
    }else{
      elem.classList.remove("hidden");
    };
  }
  useEffect(() => {
    let timerInterval;

    const updateTimer = () => {
      if (minutes === 0 && seconds === 0) {
        // Timer has reached zero
        clearInterval(timerInterval);
        handleSubmit();
        // You can add code to handle what happens when the timer reaches zero
      } else if (seconds === 0) {
        // When seconds reach zero, decrement minutes and set seconds to 59
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        // Otherwise, decrement seconds
        setSeconds(seconds - 1);
      }
    };

    timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [minutes, seconds]);

  return (
    <>
      <div className="header">
        <div className="left">
          <div className="hamburger_menu" onClick={showNavigationHandler}>
            <RxHamburgerMenu />
          </div>
          <div className="title">MCQ Questions</div>
        </div>
        <div className="right">
          <Timer />
          <button
            className="submit_test pointer"
            onClick={() => {
              setLoading(true);
            }}
          >
            Submit Test
          </button>
        </div>
      </div>
      {loading ? (
        <ConfirmNavigation
          text={"Are you want to end the test?"}
          denyText={"Back"}
          submitText={"End"}
          setLoading={setLoading}
          submitHandler={handleSubmit}
          extraComponent={<Timer />}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
