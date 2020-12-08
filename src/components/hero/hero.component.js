import React, { useEffect, useRef, useState } from "react";
import "./hero.styles.scss";
import record from "../../assets/record.svg";
import snap from "../../assets/chinese.svg";
import { useHistory } from "react-router-dom";
import SAMPLE_FORM_ENTRY from "../../enteties/sampleFormEntry";
import {IoMdCloseCircle} from 'react-icons/io'

const HeroComponent = (props) => {
  const history = useHistory();
  const [recordingStatus, setRecordingStatus] = useState("Start Recording");
  const [videoRecorder, setVideoRecorder] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
    
  const [sampleRequest, setSampleRequest] = useState(SAMPLE_FORM_ENTRY)

  const [audioRecorder, setAudioReorder] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const videoRef = useRef(null);
 

  const handleRecord = async () => {
    if (recordingStatus === "Start Recording") {
      setRecordingStatus("Stop Recording");
      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          { video: { aspectRatio: 2 }, audio: true },
          (videoStream) => {
            videoRef.current.srcObject = videoStream;
            const temp = new MediaRecorder(videoStream);
            temp.start();
            setVideoStream(videoStream);
            setVideoRecorder(temp);
          },
          () => {
            console.log("Something went wrong");
          }
        );
      }
    }

    if (recordingStatus === "Stop Recording") {
      setRecordingStatus("Discard");
      videoRecorder.stop();
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    if (recordingStatus === "Discard"){
        setSampleRequest([]);
        setVideoStream(null);
        setVideoRecorder(null);
        setSampleRequest({...sampleRequest, videoFile:""});
        setRecordingStatus("Start Recording");
        
        
    }
  };

  if (videoRecorder) {
    videoRecorder.ondataavailable = (ev) => {
      setVideoChunks([...videoChunks, ev.data]);
      console.log("CHUNK")
    };

    videoRecorder.onstop = (ev) => {
      const blob = new Blob(videoChunks, { type: "video/mp4" });
      setVideoChunks([]);
      const URL = window.URL.createObjectURL(blob);
      console.log("STOP")
      setSampleRequest({...sampleRequest, videoFile:URL});
    };
  }

  return (
    <div className="hero-container">
      <div className="search-container">
        <h2 className="hero-message">Maternal image based progress detector</h2>
        <div className="search">
          <input className="search-bar" type="text" placeholder="Search here" />
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="video-container">
        <div className="captions-container">
          <p>Read me while recording</p>
          <p className="captions">
            Don't forget that gifts often come with costs that go beyond their
            purchase price. When you purchase a child the latest smartphone,
            you're also committing to a monthly phone bill. When you purchase
            the latest gaming system, you're likely not going to be satisfied
            with the games that come with it for long and want to purchase new
            titles to play. When you buy gifts it's important to remember that
            some come with additional costs down the road that can be much more
            expensive than the initial gift itself.
          </p>
        </div>

        <div className="video">
          <h2 className="section-title">Please record your video/audio</h2>
          <div className="video-player">
            <div className="snapshots-container">
              <img src={snap} alt="Snapshot" className="snap" />
              <img src={snap} alt="Snapshot" className="snap" />
              <img src={snap} alt="Snapshot" className="snap" />
            </div>

            {
                !sampleRequest.videoFile?
                <video muted autoPlay ref={videoRef} className="webcam-view" />
                :
                null
            }

            {
                sampleRequest.videoFile?
                <video autoPlay controls src={sampleRequest.videoFile} className="webcam-view" />
                :
                null
            }
            

            <div className="video-controllers" onClick={handleRecord}>
              <div className="record-start-stop-container">
                {
                    recordingStatus === "Discard"?
                    <IoMdCloseCircle size="30" color="#dd523c" />
                    :
                    <img src={record} alt="Start Recoding" className="record" />
                }
                
                <p className="record-label">{recordingStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="user-message-container">
        <textarea
          placeholder="Enter a message here..... (Optional)"
          className="user-message"
          value={sampleRequest.comment}
          onChange={(event) => {setSampleRequest({...setSampleRequest, comment:event.target.value})}}
        />
        <div className="user-message-controls">
          <button className="submit-button" onClick={() => {sampleRequest.videoFile?history.push({pathname:"/questionnaire",state:{request: sampleRequest}}):alert("Please record the video first")}}>Submit</button>

          {/* <button
            onClick={() => {
              history.push("/questionnaire");
            }}
            className="submit-button"
          >
            Take a questionnaire
          </button> */}
        </div>
      </div>

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
              We will help you take the next step, with information and contacts
              so you can seek support.
            </li>
            <li className="item">
              Please remember that this is not a diagnosis - only a health
              professional can provide that - but it can give you a better sense
              of how you are feeling.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
