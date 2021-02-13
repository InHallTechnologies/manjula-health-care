import React, { useEffect, useState } from "react";
import "./doctors-onboard.styles.scss";
import doctor from "../../assets/doctor.png";
import InputComponent from "../../components/input/input.component";
import anime from "animejs/lib/anime.es.js";
import DoctorOnBoardForm from "../../components/doctor-onboard-form/doctor-onboard.form.component";
import SampleOnBoardEntity from "./onboard.entity";

const   DoctorsOnboard = (props) => {
  const [startOnBoarding, setStartOnBoarding] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [doctorEntity, setDoctorEntity] = useState(SampleOnBoardEntity)
  useEffect(() => {
    if (startOnBoarding) {
      anime({
        targets: ".illustration-container",
        translateX: [0, -550],
        delay: "100",
        backgroundColor: "#FFF",
        duration: 700,
        opacity: [1, 0],
        complete: function (anim) {
          setShowForm(true);
        },
      });

      
    }
  }, [startOnBoarding]);

  const startOnBoardingClicked = () => {
    setStartOnBoarding(true);
  };

  return (
    <div className="doctor-onboard-container">
      {showForm ? null : (
        <div className="illustration-container">
          <img className="illustration" src={doctor} alt="doctor" />
        </div>
      )}

      {showForm ? (
        <div className='other-info'>
        <img className="illustration-blurred" src={doctor} alt="doctor" />
          <DoctorOnBoardForm  sampleEntity={doctorEntity} setSampleEntity={setDoctorEntity} />
        </div>
      ) : (
        <div className="form-container">
          <p className="heading">Sign up today</p>
          <p className="sub-heading">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <div className="top-line-element"></div>
          <div className="form">
            <InputComponent value={doctorEntity.name} onChange={(event) => {setDoctorEntity({...doctorEntity,name:event.target.value})}}  tag="Name" name="name" />
            <InputComponent value={doctorEntity.phoneNumber} onChange={(event) => {setDoctorEntity({...doctorEntity,phoneNumber:event.target.value})}} tag="Phone Number" name="phoneNumber" type="tel" />
            <button onClick={startOnBoardingClicked} className="get-started">
              Get Started
            </button>
          </div>

          <div className="bottom-line-element"></div>
          <p className="legal-container">
            By signing up you agree to our{" "}
            <span className="legal">Terms and Condition</span> and{" "}
            <span className="legal">Privacy Policy</span>
          </p>
          <p></p>
        </div>
      )}
    </div>
  );
};

export default DoctorsOnboard;
