import React, { useEffect, useRef, useState } from "react";
import "./landing-page.styles.scss";
import happyGirl from "../../assets/happy-girl.mp4";
import curve from "../../assets/Rectangle 1.svg";
import logo from "../../assets/logo.svg";
import { useHistory } from "react-router-dom";
import secondSection from "./secondSection";
import tabletView from '../../assets/tablet-view.png';
import thirdSection from "./thirdSection";
import fourthSection from "./fourthSection";
import aboutUsIllus from '../../assets/about-us-illus.png';
import { AiOutlineMail } from 'react-icons/ai';
import { Snackbar } from "@material-ui/core";
import appleStore from '../../assets/apple-store.png';
import playStore from '../../assets/play-store.png';

const LandingPage = (props) => {
  const videoRef = useRef(null);
  const history = useHistory();
  const [ snackBarMessage, setSnackBarMessage ] = useState("");

  useEffect(() => {
    console.log(videoRef.current);
    videoRef.current.play();
  }, []);

  const handleCopy = () => {
    const el = document.createElement('textarea');
    el.value = 'info@eazynurture.com';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    window.location.href = "mailto:info@eazynurture.com";
    setSnackBarMessage("Copy to clipboard: info@eazynurture.com");
    setTimeout(() => {
      setSnackBarMessage("");
    }, 3000);
  }

  return (
    <div className="landing-page-container">
      <div className="background-container">
        <video loop className="video-player" ref={videoRef} muted autoPlay>
          <source src={happyGirl} type="video/mp4" />
        </video>
      </div>

      <div className="action-container">
        {/* <img className="bg-curve " src={curve} alt="curve" /> */}

        <div className="get-started-container">
          <img className="logo" src={logo} alt="logo" />
          <p className="headlines">
            Passionate Community Providing Brain Health Support and Care for Mother, Child and Family
          </p>
          <button className="get-started submit-button" onClick={() => {history.push('contact-us')}} >Get Started</button>
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
        <p className='ts-title'>Listen to new meditations, contents everyday that are relevant to your world</p>
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
      <div className='fourth-screen-container' >
          <div className='center-content'>
              {
                fourthSection.map(({name, icon, id}) => {
                  return(
                    <div className='person-container' key={id}>
                      <img className='person-img' src={icon} alt={name} />
                      <p className='person-name' >{name}</p>
                      <p style={{margin:0, marginTop:"5px"}}>Therapist</p>
                    </div>
                  )
                })
              }
          </div>
      </div>

      {/* Fifth Section */}
      <div className='fifth-screen-container'>
          <img className='abous-us-illus' src={aboutUsIllus} alt='about-us' /> 
          <div className='about-us-content'>
              <p className='fifth-section-title'>About Us</p>
              <p className='tagline-one'>Community Service team to empower every woman to her right of personal counselors</p>
              <p className='tagline-def'>Contact us for free counselling and detailed demo of the service.  This is for women by the women community.</p>
              <p className='tagline'><span className='quotes'>{'" '}</span>With each generation, women’s ability to live the lives they choose reaches a place their grandmothers never thought possible. But that doesn’t mean everything is perfect or that our work is finished.<span className='quotes'> "</span> <span className='quote-author'> -- Cathy McMorris Rodgers</span></p>
          </div>
      </div>

     

       {/* Sixth Screen */}
       <div className='fourth-screen-container sixth-section-container' >
          <p className='sixth-section-title'>Every Woman need a personal counselor when she plans her journey through womanhood, motherhood and more! </p>
          <p className='contact-us-label'>Contact Us</p>
          <p className='sixth-section-tagline' >Stop here and join the members in your sisterhood to provide a trained counseling as you embark on the journey creating your beautiful life, you are never Alone and Team is there with you ! </p>
          <div className='contact-us-button' onClick={handleCopy} >
            <AiOutlineMail color='white' size={20}  />
            <p className='contact-us-email'>info@eazynurture.com</p>
          </div>
      </div>

       {/* Download  Now */}

       <div className='download-now-container'>
        <p className='download-links-title'>Coming Soon!</p>
        <div className='download-links-container'>
          <img className='play-store' src={playStore} alt="Play Store" />
          <img className='apple-store' src={appleStore} alt="Apple Store"/>
        </div>
      </div>

      <div className='rights-reserved-container'>
        <p className='all-rights-reserved'>&#169; Copyright 2021. All Rights Reserved.</p>
        
      </div>

      <Snackbar message={snackBarMessage} open={snackBarMessage?true:false}  />

    </div>



  );
};

export default LandingPage;
