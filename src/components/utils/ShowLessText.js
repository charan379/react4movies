import React, { useState } from "react";

const ShowLessText = ({data}) => {
  const [showMore, setShowMore] = useState(false);
  const text = data.text;
  if(text.length <= 150){
    return text;
  }
  return (
    <div>
        {showMore ? text : `${text.substring(0, 150)}`}
        <span onClick={() => setShowMore(!showMore)}>
          {showMore ? " : Show less" : " : Show more"}
        </span>
    </div>
  );
};

ShowLessText.defaultProps = {
    data : {
        text : "No Data"
    }
}

export default ShowLessText;
