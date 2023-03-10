import React, { useState } from "react";

const ShowLessText = ({ text, limit }) => {
  const [showMore, setShowMore] = useState(false);
  if (text?.length <= limit ?? 150) {
    return text;
  }
  return (
    <>
      {showMore ? text : `${text.substring(0, limit ?? 150)}`}
      <span style={
        {
          display:"inline",
          textDecoration: "none",
          fontStyle: "italic",
          fontFamily: "monospace",
          fontWeight: "bold",
          cursor: "pointer",
          color:"#4787d6"
        }
      } onClick={() => setShowMore(!showMore)}>
        {showMore ? " ...less" : " ...more"}
      </span>
    </>
  );
};

ShowLessText.defaultProps = {
  data: {
    text: "No Data"
  }
}

export default ShowLessText;
