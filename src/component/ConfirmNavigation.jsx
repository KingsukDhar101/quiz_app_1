import { useEffect } from "react";

const ConfirmNavigation = ({
  text,
  denyText,
  submitText,
  submitHandler,
  setLoading,
  extraComponent,
}) => {
  useEffect(() => {
    // console.log("extraComponent : ",extraComponent);
    const confirmMessage = "Are you sure you want to leave this page?";
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = confirmMessage; // display the confirmation message
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="confirm_msg_container">
      <div className="confirm_msg_wrapper">
        {extraComponent}
        <div className="big_text">{text}</div>
        <div className="btn_wrapper">
          <button
            className="submit bg-gray-light pointer"
            onClick={() => {
              setLoading(false);
            }}
          >
            {denyText}
          </button>
          <button className="submit bg-blue white pointer" onClick={submitHandler}>
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmNavigation;
