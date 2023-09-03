import { useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import {
  updateActiveQuestion,
  getAllQuestionData,
} from "../features/user/userSlice";
import { parsingHTML } from "../utility/base";

const QuestionBox = () => {
  const dispatch = useDispatch();
  const { activeQuestion, allQuestionData } = useSelector(
    (state) => state.user
  );
  const [allQuestionDataState, setAllQuestionDataState] =
    useState(allQuestionData);
  const [currentQuestionData, setCurrentQuestionData] = useState(
    allQuestionData ? allQuestionData[activeQuestion] : {}
  );
  const [ans, setAns] = useState([]);

  const onSelectAnswerHandler = (e, selectIndex, answer_item) => {
    // console.log("-> ", selectIndex, answer_item);
    setAllQuestionDataState(
      allQuestionDataState.map((item, index) => {
        if (index == selectIndex) {
          return {
            ...allQuestionDataState[index],
            userAns: answer_item,
          };
        } else {
          return item;
        }
      })
    );
  };

  

  const handleNext = () => {
    if (activeQuestion < allQuestionData.length - 1) {
      dispatch(updateActiveQuestion(activeQuestion + 1));
    } else {
      // console.log("at last index, cant go to next.");
    }
  };
  const handlePrev = () => {
    if (activeQuestion > 0) {
      dispatch(updateActiveQuestion(activeQuestion - 1));
    } else {
      // console.log("at 0th index, cant go to prev.");
    }
  };

  useEffect(() => {
    dispatch(getAllQuestionData(allQuestionDataState));
  }, [allQuestionDataState]);

  useEffect(() => {
    if (allQuestionData) {
      setCurrentQuestionData(allQuestionData[activeQuestion]);
      setAllQuestionDataState(allQuestionData);
    }
  }, [activeQuestion, allQuestionData]);

  useEffect(() => {
    setAllQuestionDataState(
      allQuestionDataState.map((item, index) => {
        if (index == activeQuestion) {
          return {
            ...allQuestionDataState[index],
            isReviewed: true,
          };
        } else {
          return item;
        }
      })
    );
  }, [activeQuestion]);

  useEffect(() => {
    if (currentQuestionData) {
      setAns([
        ...currentQuestionData.incorrect_answers,
        currentQuestionData.correct_answer,
      ]);
    }
  }, [currentQuestionData]);

  return (
    <div className="question_container">
      <div className="question_container_wrapper">
        <div className="heading">
          Q{activeQuestion + 1}. {currentQuestionData?.category}
        </div>
        <div className="question_box">
          <div className="question_text">
            {parsingHTML(currentQuestionData?.question)}
          </div>
          <div className="answer_container">
            {ans?.map((answer_item, index) => (
              <label
                className="answer_box"
                // id={`${activeQuestion + 1}_${index}`}
                key={`${activeQuestion + 1}_${index}`}
                onClick={(e) => {
                  onSelectAnswerHandler(e, activeQuestion, answer_item);
                }}
                style={{
                  border:
                    currentQuestionData?.userAns &&
                    currentQuestionData?.userAns == answer_item
                      ? "1px solid blue"
                      : "1px solid #cccccc75",
                }}
              >
                <input
                  type="radio"
                  name={`${activeQuestion}_answer`}
                  id={`${activeQuestion + 1}_${index}`}
                  onChange={(e) => {
                    onSelectAnswerHandler(e, activeQuestion, answer_item);
                  }}
                  checked={
                    currentQuestionData?.userAns &&
                    currentQuestionData?.userAns == answer_item
                      ? true
                      : false
                  }
                />
                <p>{parsingHTML(answer_item)}</p>
              </label>
            ))}
          </div>
        </div>
        <div className="btn_nav">
          {activeQuestion > 0 && (
            <button className="prev pointer" onClick={handlePrev}>
              <div className="icon">
                <MdKeyboardArrowLeft />
              </div>
              Previous
            </button>
          )}
          {activeQuestion < allQuestionData?.length - 1 && (
            <button className="next pointer" onClick={handleNext}>
              Next
              <div className="icon">
                <MdKeyboardArrowRight />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
