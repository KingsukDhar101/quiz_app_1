import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import ConfirmNavigation from "./ConfirmNavigation";
import {endTest} from '../features/user/userSlice';
import { parsingHTML } from "../utility/base";

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const history = useHistory();
  const {
    email,
    allQuestionData,
    numberOfCorrectAnswer,
    numberOfIncorrectAnswer,
  } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);


  const getBorderStyle = (item, answerItem) => {
    if (item.userAns === answerItem) {
      if (item.userAns === item.correct_answer) {
        return "1px solid green";
      } else if (item.userAns !== item.correct_answer) {
        return "1px solid red";
      }
    } else {
      if (answerItem === item.correct_answer) {
        return "1px solid green";
      } else {
        return "1px solid #cccccc75";
      }
    }
  };
  const getBackgroundStyle = (item, answerItem) => {
    if (item.userAns === answerItem) {
      if (item.userAns === item.correct_answer) {
        return "#4dce4d2b";
      } else if (item.userAns !== item.correct_answer) {
        return "#ba272717";
      }
    } else {
      if (answerItem === item.correct_answer) {
        return "#4dce4d2b";
      } else {
        return "";
      }
    }
  };

  const getColor = (item, answerItem) => {
    if (item.userAns === answerItem) {
      if (item.userAns === item.correct_answer) {
        return "green";
      } else if (item.userAns !== item.correct_answer) {
        return "red";
      }
    } else {
      if (answerItem === item.correct_answer) {
        return "green";
      } else {
        return "";
      }
    }
  };

  const backToHomePage = (e) => {
    e.preventDefault();
    dispatch(endTest());
  };

  useEffect(() => {
    if (!email && !allQuestionData?.length) {
      // window.location.reload();
      navigate("/");
    }
  }, [allQuestionData]);

  return (
    <>
      <div className="result_container">
        <h3 style={{ textAlign: "center", padding: "30px" }}>Result</h3>
        <button
          className="home pointer"
          onClick={() => {
            setLoading(true);
          }}
        >
          End
        </button>
        <div className="userData">
          <div className="med_text">Email : {email}</div>
          <div className="med_text">
            Correct Answers : {numberOfCorrectAnswer}
          </div>
          <div className="med_text">
            Incorrect Answers : {numberOfIncorrectAnswer}
          </div>
          <div className="med_text">
            Skipped :{" "}
            {allQuestionData?.length -
              (numberOfIncorrectAnswer + numberOfCorrectAnswer)}
          </div>
        </div>
        <div className="question_container_wrapper">
          <>
            {allQuestionData &&
              allQuestionData?.map((item, qIndex) => (
                <div key={qIndex} style={{ borderBottom: "1px solid #ccc" }}>
                  <div className="heading">
                    Q{qIndex + 1}. {item?.category}
                  </div>
                  <div className="question_box">
                    <div className="question_text">
                      {parsingHTML(item?.question)}
                    </div>
                    <div className="answer_container">
                      {item.answers?.map((answer_item, AIndex) => (
                        <div
                          className="answer_wrapper"
                          key={`${qIndex}_${AIndex}`}
                        >
                          <label
                            className="answer_box"
                            // id={`${activeQuestion + 1}_${index}`}
                            style={{
                              border: getBorderStyle(item, answer_item),
                              backgroundColor: getBackgroundStyle(
                                item,
                                answer_item
                              ),
                            }}
                          >
                            <input
                              type="radio"
                              name={`${qIndex}_answer`}
                              id={`${qIndex}_${AIndex}`}
                              checked={item?.userAns === answer_item}
                              disabled
                            />
                            <p>{parsingHTML(answer_item)}</p>
                          </label>
                          {answer_item == item.userAns ? (
                            <p
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: getColor(item, answer_item),
                              }}
                            >
                              Your Answer
                            </p>
                          ) : answer_item == item.correct_answer ? (
                            <p
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: getColor(item, answer_item),
                              }}
                            >
                              Correct Answer
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </>
        </div>
      </div>
      {loading ? (
        <ConfirmNavigation
          text={"Are you want to end the test?"}
          denyText={"Back"}
          submitText={"End"}
          setLoading={setLoading}
          submitHandler={backToHomePage}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Result;
