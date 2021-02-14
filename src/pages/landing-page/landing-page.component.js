import React, { useEffect, useRef } from "react";
import "./landing-page.styles.scss";
import happyGirl from "../../assets/happy-girl.mp4";
import curve from "../../assets/Rectangle 1.svg";
import logo from "../../assets/logo.svg";
import { useHistory } from "react-router-dom";

const LandingPage = (props) => {
  const videoRef = useRef(null);
  const history = useHistory();
  useEffect(() => {
    console.log(videoRef.current);
    videoRef.current.play();
  }, []);

  return (
    <div className="landing-page-container">
      <div className="background-container">
        <video loop className="video-player" ref={videoRef} muted autoPlay>
          <source src={happyGirl} type="video/mp4" />
        </video>
      </div>

      <div className="action-container">
        <img className="bg-curve " src={curve} alt="curve" />

        <div className="get-started-container">
          <img className="logo" src={logo} alt="logo" />
          <p className="headlines">
            Passionate Community Providing Brain Health Support and Care for Mother, Child and Family
          </p>
          <button className="get-started submit-button" onClick={() => {history.push('care')}} >Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
