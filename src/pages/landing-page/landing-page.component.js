import React, { useEffect, useRef } from "react";
import "./landing-page.styles.scss";
import happyGirl from "../../assets/happy-girl.mp4";
import curve from "../../assets/Rectangle 1.svg";
import logo from "../../assets/logo.svg";
import { useHistory } from "react-router-dom";
import secondSection from "./secondSection";
import tabletView from '../../assets/tablet-view.png';
import thirdSection from "./thirdSection";
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

      {/* Second Section */}
      <div className='second-section'>
        <p className='ss-title' >Make a memorable journey as you reach various milestones in life</p>
        <div className='ss-list-container'>
        {
          secondSection.map(({title, icon, id}) => {
            return(
              <div className='ss-list-item' key={id} >
                <img className='ss-list-img' src={icon} alt={title} />
                <p className='ss-list-title'>{title}</p>
              </div>
            )
          })
        }
        </div>
        <img className='ss-bottom-img' src={tabletView} alt='eazynurture' />
      </div>


      {/* Third Screen */}
      <div className='third-screen-container'>
        <p className='ts-title'>Listen to new meditations,contents everyday that are relevant to your world</p>
        <div className='ts-list-container'>
          {
            thirdSection.map(({title, icon, id}) => {
              return(
              <div className='ts-list-item' key={id} >
                <img className='ts-list-img' src={icon} alt={title} />
                <p className='ts-list-title'>{title}</p>
              </div>
            )
            })
          }
        </div>
      </div>

      {/* Fourth Screen */}
      
    </div>
  );
};

export default LandingPage;
