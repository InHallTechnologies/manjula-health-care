import React, { useEffect, useState } from "react";
import InputComponent from "../input/input.component";
import "./onboard-question.styles.scss";
import { CgProfile } from "react-icons/cg";

const OnBoardQuestions = ({ currentSelectedTab, sampleEntity, setSampleEntity }) => {
  const [skillSet, setSkillSet] = useState([]);

  useEffect(() => {
    if (sampleEntity){
      switch(sampleEntity.speciality){
        case "Dentist":{
          setSkillSet(["Communication","Patience","A thorough and methodical approach","Ability to work long hours, often under pressure","Manual dexterity","Teamwork skills"]);
          break;
        }
        case "Gynecologist/Obstetrician":{
          setSkillSet(["Management of a wide variety of conditions"]);
          break;
        }
  

        case "Dietitian/Nutrition":{
          setSkillSet(["Team-working skills","Keen interest in the impact of diet on health","Good interpersonal skills","Communication skills","An understanding of science","Able to motivate others"]);
          break;
        }
  

        case "Physiotherapist":{
          setSkillSet(["Focuses on the complete diagnosis","Medical management","Rehabilitation of individuals of all ages with neuromusculoskeletal disorders and associated disabilities"]);
          break;
        }
        
        case "General Surgeon": {
          setSkillSet(["Specialist knowledge","Good communication skills","A bright, eager mind","Extensive experience","Emotional resilience","Leadership skills"]);
          break;
        }

        case "Orthopedist":{
          setSkillSet(["Specialist knowledge","Rehabilitation","Surgery to restore normal function"]);
          break;
        }

        case "General Physician":{
          setSkillSet(["Ability to work long hours, often under pressure","Good practical skills","Ability to solve problems","Decision-making","Leadership","Management skills","Communication skills","Analytical ability"]);
          break;
        }

        case "Pediatrician":{
          setSkillSet(["Health promotion","Prevention","Detection","Treatment of physical, behavioral, mental/emotional, environmental, and social issues that affect children"]);
          break;
        }
        case "Gastroenterologist":{
          setSkillSet(["Procedure-oriented","Prowess and the ability to analyze problems","Analyze large data",]);
          break;
        }
  
        default:{
          setSkillSet(["Communication","Patience","A thorough and methodical approach","Ability to work long hours, often under pressure","Manual dexterity","Teamwork skills"]);
        }
      }
    }
    
  }, [sampleEntity.speciality])

  return (
    <div className="onboard-questions-container">
      {currentSelectedTab === "PERSONAL" ? (
        <div className="question-container personal-questions">
          <div className="upload-display-picture">
            <CgProfile className="picture" size="90" color={"#444"} />
            <p>Click to upload profile picture</p>
          </div>
          <InputComponent
           viewType="TEXT_FIELD"
            value={sampleEntity.name}
            tag="Name"
            style={{ width: "100%" }}
            onChange={(event) => {setSampleEntity({...sampleEntity, name:event.target.value})}}
          />
          <InputComponent  onChange={(event) => {setSampleEntity({...sampleEntity, phoneNumber:event.target.value})}} style={{ width: "100%" }}  value={sampleEntity.phoneNumber} tag="Phone Number" />
        </div>
      ) : null}

      {currentSelectedTab === "PROFESSIONAL" ? (
        <div className="question-container professional-questions">
          <InputComponent viewType="DROP_DOWN" items={["PY","PYS","Dr","Therapist","Counselor","Personal Care Giver"]} onChange={(event) => {setSampleEntity({...sampleEntity, prefix:event.target.value})}} style={{ width: "100%" }} value={sampleEntity.prefix} tag="Prefix" />
          <InputComponent viewType="DROP_DOWN" items={["Dentist","Gynecologist/Obstetrician","Dietitian/Nutrition","Physiotherapist","General Surgeon","Orthopedist","General Physician","Pediatrician","Gastroenterologist"]}  onChange={(event) => {setSampleEntity({...sampleEntity, speciality:event.target.value})}} style={{ width: "100%" }} value={sampleEntity.speciality} tag="Speciality" />
          <InputComponent viewType="CHECK_BOXES" items={skillSet} onChange={(event) => {setSampleEntity({...sampleEntity, skills:event.target.value})}} style={{ width: "100%" }} value={sampleEntity.skills} tag="Skills" />
          <InputComponent
           style={{ width: "100%" }}
            value={sampleEntity.currentWorkingHospital}
            tag="Current Working Hospital"
            onChange={(event) => {setSampleEntity({...sampleEntity, currentWorkingHospital:event.target.value})}}
          />
          <InputComponent
          viewType="TEXT_FIELD"
           style={{ width: "100%" }}
            value={sampleEntity.currentWorkingAddress}
            tag="Hospital Address"
            onChange={(event) => {setSampleEntity({...sampleEntity, currentWorkingAddress:event.target.value})}}
          />
          <InputComponent
           viewType="TEXT_FIELD"
           style={{ width: "100%" }}
            value={sampleEntity.currentWorkingCity}
            tag="Hospital City"
            onChange={(event) => {setSampleEntity({...sampleEntity, currentWorkingCity:event.target.value})}}
          />
          <InputComponent
           viewType="TEXT_FIELD"
           style={{ width: "100%" }}
            value={sampleEntity.currentWorkingState}
            tag="Hospital State"
            onChange={(event) => {setSampleEntity({...sampleEntity, currentWorkingState:event.target.value})}}
          />
        </div>
      ) : null}

      {currentSelectedTab === "ONBOARD" ? (
        <div className="question-container onboard-questions">
          <InputComponent
           viewType="TEXT_FIELD"
           style={{ width: "100%" }}
            value={sampleEntity.chargesForVideoConsulting}
            tag="Charges for Video Consultation (per minute)"
            placeholder={"₹"}
            onChange={(event) => {setSampleEntity({...sampleEntity, chargesForVideoConsulting:event.target.value})}}
          />
          <div className='working-hours'>
            <p className='working-hours-element'>Working hours</p>
            <div className='working-hours-from-to'>
              <InputComponent
                viewType="TEXT_FIELD"
                value={sampleEntity.workingHours.from}
                style={{marginTop:0, width:"50%"}}
                placeholder="From"
                onChange={(event) => {setSampleEntity({...sampleEntity, workingHours:{...sampleEntity, from:event.target.value}})}}
                type='time'
              />
              <InputComponent
               viewType="TEXT_FIELD"
                value={sampleEntity.workingHours.to}
                style={{marginTop:0, width:"50%", marginLeft:'100px'}}
                placeholder="To"
                type='time'
                onChange={(event) => {setSampleEntity({...sampleEntity, workingHours:{...sampleEntity, to:event.target.value}})}}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OnBoardQuestions;
