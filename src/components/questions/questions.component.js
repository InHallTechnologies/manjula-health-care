import React, { useContext, useEffect } from "react";
import CONTEXT_TYPES from "../../context/contectType";
import Context from "../../context/context";
import "./questions.styles.scss";

const Questions = ({ question, options }) => {

  const [{sampleRequest}, setSampleRequest] = useContext(Context);

  useEffect(() => {
    setSampleRequest({type:CONTEXT_TYPES.getSampleRequest});
  }, [])



  return (
    <div className="question-container">
      <p className="question">{question}</p>
      <div className="options-container">
        {options.map((item, index) => {
          return (
            <div className="option" key={question+index}>
            {/* {console.log(sampleRequest.questionnaire)} */}
              <input
                type="radio"
                name={question}
                value={item}
                defaultChecked={false}
                checked={sampleRequest.questionnaire?sampleRequest.questionnaire[question] === item: false}
                onClick={() => {
                  setSampleRequest({type:CONTEXT_TYPES.setSampleRequest, payload:{ ...sampleRequest, questionnaire: {...sampleRequest.questionnaire, [question]:item} }});
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
