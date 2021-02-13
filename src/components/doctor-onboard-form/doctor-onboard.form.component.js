import React, { useEffect, useState } from "react";
import "./doctor-onboard-form.styles.scss";
import anime from "animejs/lib/anime.es.js";
import OnBoardQuestions from "../onboard-questions/onboard-question.component";

const DoctorOnBoardForm = ({ sampleEntity, setSampleEntity }) => {
  const [currentTab, setCurrentTab] = useState("PERSONAL");

  useEffect(() => {
    if (currentTab === "PERSONAL") {
      anime({
        targets: ".personal-details",
        color: "#72b198",
        delay: "100",
        easing: "linear",
        duration: 300,
       
      });
      anime({
        targets: ".professional-details",
        color: "#CCC",
        delay: "100",
        easing: "linear",
        duration: 300,
       
      });
      anime({
        targets: ".onboard-details",
        color: "#CCC",
        delay: "100",
        easing: "linear",
        duration: 300,
        
      });
    }else if (currentTab === "PROFESSIONAL") {
        anime({
          targets: ".professional-details ",
          color: "#72b198",
          delay: "100",
          easing: "linear",
          duration: 300,
         
        });
        anime({
          targets: ".personal-details",
          color: "#ccc",
          delay: "100",
          easing: "linear",
          duration: 300,
         
        });
        anime({
          targets: ".onboard-details",
          color: "#ccc",
          delay: "100",
          easing: "linear",
          duration: 300,
         
        });
      }else {
        anime({
            targets: ".onboard-details ",
            color: "#72b198",
            delay: "100",
            easing: "linear",
            duration: 300,
           
          });
          anime({
            targets: ".personal-details",
            color: "#ccc",
            delay: "100",
            easing: "linear",
            duration: 300,
           
          });
          anime({
            targets: ".professional-details",
            color: "#ccc",
            delay: "100",
            easing: "linear",
            duration: 300,
           
          });
      }
  },[currentTab]);

  const handleNext = (event) => {
    if (currentTab === "PERSONAL") {
      setCurrentTab("PROFESSIONAL");
    }else if (currentTab === "PROFESSIONAL") {
        setCurrentTab("ONBOARD")
    }
  };

  const handleBack = (event) => {
    if (currentTab === "PROFESSIONAL") {
        setCurrentTab("PERSONAL");
      }else if (currentTab === "ONBOARD") {
          setCurrentTab("PROFESSIONAL")
      }
  }

  return (
    <div className="doctor-onboard-form-container">
      <h1 className="title">{`Hello ${sampleEntity.name}`}</h1>
      <div className="doctor-onboard-content">
        <div className="progress-indicator">
          <div
            className={`personal-details indicator ${
              currentTab === "PERSONAL" && "selected"
            }`}
          >
            Personal Details
          </div>
          <div
            className={`professional-details indicator ${
              currentTab === "PROFESSIONAL" && "selected"
            }`}
          >
            Professional Details
          </div>
          <div
            className={`onboard-details indicator ${
              currentTab === "ONBOARD" && "selected"
            }`}
          >
            Onboard Details
          </div>
        </div>

        <div>
            <OnBoardQuestions setSampleEntity={setSampleEntity} currentSelectedTab={currentTab} sampleEntity={sampleEntity} />   
        </div>
        <div className="form-control" style={{justifyContent:currentTab==="PERSONAL"?'flex-end':'space-between'}}>
          {currentTab === "PERSONAL" ? null : <button className='submit-button' onClick={handleBack}>Back</button>}
          <button className='submit-button' onClick={handleNext}>{currentTab==="ONBOARD"? "Submit":"Next"}</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorOnBoardForm;

//Personal Details
//Professional Details
//Onboard Details
