import React, { useState } from "react";
import { Link } from "react-router-dom";

const ShowLessNames = ({ commaSepratedText, limit }) => {
  const [showMore, setShowMore] = useState(false);
  if (commaSepratedText?.split(",")?.length <= limit ?? 3) {
    return commaSepratedText;
  }
  return (
    <>
      {showMore ? commaSepratedText : `${commaSepratedText?.split(",").slice(0, limit ?? 3).map(ele => ele).join(",")}`}
      <span style={
        {
          display: "inline",
          textDecoration: "none",
          fontStyle: "italic",
          fontFamily: "monospace",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#4787d6"
        }
      } >
        <Link
          style={{
            display: "inline",
            textDecoration: "none",
            fontStyle: "italic",
            fontFamily: "monospace",
            fontWeight: "bold",
            cursor: "pointer",
            color: "#4787d6"
          }}
          title={showMore ? "Show less names" : "Show more names"}
          onClick={() => setShowMore(!showMore)}>
          {showMore ? " ...less" : " ...more"}
        </Link>
      </span>
    </>
  );
};

ShowLessNames.defaultProps = {
  data: {
    text: "No Data"
  }
}

export { ShowLessNames };
