const Footer = () => {
  const footer_box_data = [
    { color: "rgb(103, 209, 103)", text: "Attempted" },
    { color: "#ccc", text: "Skipped" },
    { color: "rgb(255, 170, 0)", text: "Reviewed" },
  ];
  return (
    <>
      <div className="footer">
        <div className="footer_box_wrapper">
          {footer_box_data &&
            footer_box_data.map((item, index) => (
              <div className="box" key={index}>
                <div className="icon" style={{ backgroundColor: item?.color }}></div>
                <div className="text">{item?.text}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Footer