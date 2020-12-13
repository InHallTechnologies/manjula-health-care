import React from "react";
import "./questions.styles.scss";

const Questions = ({ question, options, sampleRequest, setSampleRequest }) => {
  return (
    <div className="question-container">
      <p className="question">{question}</p>
      <div className="options-container">
        {options.map((item) => {
          return (
            <div className="option">
              <input
                type="radio"
                name={question}
                value={item}
                checked={sampleRequest.questionnaire[question] === item}
                onClick={() => {
                  setSampleRequest({ ...sampleRequest, questionnaire: {...sampleRequest.questionnaire, [question]:item} });
                }}
              />
              <p style={{ margin: "0px", marginLeft: "5px", marginTop: "1px" }}>
                {item}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;
