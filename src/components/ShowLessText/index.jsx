"use client";

import React, { useState } from "react";

const ShowLessText = ({ text, limit }) => {
  const [showMore, setShowMore] = useState(false);
  if (!text) {
    return "";
  }
  if (text?.length <= limit ?? 150) {
    return text;
  }
  return (
    <>
      {showMore ? text : `${text.substring(0, limit ?? 150)}`}
      <span
        style={{
          display: "inline",
          textDecoration: "none",
          fontStyle: "italic",
          fontFamily: "monospace",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#4787d6",
        }}
      >
        <button
          style={{
            display: "inline",
            textDecoration: "none",
            fontStyle: "italic",
            fontFamily: "monospace",
            fontWeight: "bold",
            cursor: "pointer",
            color: "#4787d6",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderWidth: "0px",
          }}
          title={showMore ? "Show less" : "Show more"}
          onClick={(event) => {
            event.preventDefault();
            setShowMore(!showMore);
          }}
        >
          {showMore ? " ...less" : " ...more"}
        </button>
      </span>
    </>
  );
};

export default ShowLessText;
