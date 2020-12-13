import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import NavigationBar from "../../components/navigation/navigation-bar.component";
import questionsList from "../../components/questions/questionList";
import Questions from "../../components/questions/questions.component";
import CONTEXT_TYPES from "../../context/contectType";
import Context from "../../context/context";
import SAMPLE_FORM_ENTRY from "../../enteties/sampleFormEntry";
import "./questionnaire.styles.scss";
const QuestionnaireScreen = (props) => {
  const [sampleRequest, setSampleRequest] = useState(SAMPLE_FORM_ENTRY);
  const [globalState, dispatchForGlobalState] = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatchForGlobalState({ type: CONTEXT_TYPES.getUser });
    if (props.location.state){
        setSampleRequest({ ...props.location.state.request });
    }
    
  }, []);

  const handleSubmit = () => {
    if (globalState.userData) {
      alert("Your request has been submitted successfully");
    } else {
      alert("Please login to submit the form");
    }
  };

  //    if (!props.location.state){
  //     return(
  //         <Redirect to='/' />
  //     )
  //    }

  return (
    <div className="questionnaire-container">
      <NavigationBar />
      <div className="questionnaire-content">
        <p>
          Tick a box next to each question that best reflects your thoughts,
          feelings and behaviour.
        </p>
        <h4>In the past 4 weeks...</h4>

        <div className="questions">
          {questionsList.map((item) => {
            return (
              <Questions
                key={item.question}
                question={item.question}
                options={item.options}
                sampleRequest={sampleRequest}
                setSampleRequest={setSampleRequest}
              />
            );
          })}
        </div>

        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>

        <div className="meta-data-container">
          <p className="title">What happens next?</p>
          <div className="content">
            <p className="sub-title">
              Your responses will help us provide you with a score
            </p>
            <ul className="list-container">
              <li className="item">
                Based on this score, we will tell you whether you fall into the
                low, medium or high range.
              </li>
              <li className="item">
                We will help you take the next step, with information and
                contacts so you can seek support.
              </li>
              <li className="item">
                Please remember that this is not a diagnosis - only a health
                professional can provide that - but it can give you a better
                sense of how you are feeling.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireScreen;
