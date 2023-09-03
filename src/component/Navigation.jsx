import { useSelector, useDispatch } from "react-redux";
import { updateActiveQuestion } from "../features/user/userSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const { activeQuestion, allQuestionData } = useSelector(
    (state) => state.user
  );

  return (
    <>
      <div className="navigation">
        <div className="navigation_wrapper">
          {/* <div className="logo">++</div> */}
          <div className="question_number_box"></div>
          {allQuestionData?.length &&
            allQuestionData.map((item, index) => (
              <div
                className="question_number_box"
                style={{
                  backgroundColor:
                    activeQuestion == index ? "#f0fdff" : "unset",
                }}
                key={index}
                onClick={() => {
                  dispatch(updateActiveQuestion(index));
                }}
              >
                <div
                  className="icon"
                  style={{
                    backgroundColor: allQuestionData[index]?.userAns
                      ? "rgb(103, 209, 103)"
                      : allQuestionData[index]?.isReviewed
                      ? "rgb(255, 170, 0)"
                      : "#ccc",
                  }}
                ></div>
                <div className="text">Q.{index + 1}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
