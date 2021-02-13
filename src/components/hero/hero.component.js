import React, {  useContext, useEffect, useRef, useState, createRef } from "react";
import "./hero.styles.scss";
import record from "../../assets/record.svg";
import { useHistory } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import captions from "./staticReadingCaptions";
import questionsList from "../questions/questionList";
import Questions from "../questions/questions.component";
import {BsCaretRightFill} from 'react-icons/bs';
import Context from "../../context/context";
import CONTEXT_TYPES from "../../context/contectType";
import { database } from "../../firebase/firebase-handler";

const HeroComponent = (props) => {
  const history = useHistory();
  const [recordingStatus, setRecordingStatus] = useState("Start Recording");
  const [videoRecorder, setVideoRecorder] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);

  const [{sampleRequest}, setSampleRequest] = useContext(Context);

  const [audioRecorder, setAudioReorder] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const [snapshotInterval, setSnapshotInterval] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [readingCaptions, setReadingCaptions] = useState("");
  const canvas = useRef(null);

  const videoRef = useRef(null);

  const handleRecord = async () => {
    if (recordingStatus === "Start Recording") {
      setRecordingStatus("Stop Recording");
      if (navigator.mediaDevices.getUserMedia) {
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: { aspectRatio: 2 },
          audio: true,
        });

        videoRef.current.srcObject = videoStream;
        const temp = new MediaRecorder(videoStream);
        temp.start();
        setVideoStream(videoStream);
        setVideoRecorder(temp);

        const intv = setInterval(() => {
          clickImage();
        }, 5000);

        setSnapshotInterval(intv);
      } else if (navigator.getUserMedia) {
        alert("HELLO");
      }
    }

    if (recordingStatus === "Stop Recording") {
      setRecordingStatus("Discard");
      videoRecorder.stop();
      if (snapshotInterval) {
        clearInterval(snapshotInterval);
      }
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    if (recordingStatus === "Discard") {
      setSampleRequest({type:CONTEXT_TYPES.setSampleRequest, payload:[]});
      setVideoStream(null);
      setVideoRecorder(null);
      setSampleRequest({type:CONTEXT_TYPES.setSampleRequest, payload:{...sampleRequest, videoFile: "", snapshots: [] }});
      setRecordingStatus("Start Recording");
    }
  };

  if (videoRecorder) {
    videoRecorder.ondataavailable = (ev) => {
      setVideoChunks([...videoChunks, ev.data]);
      console.log("CHUNK");
    };

    videoRecorder.onstop = async (ev) => {
      const blob = new Blob(videoChunks, { type: "video/mp4" });
      setVideoChunks([]);
      const URL = window.URL.createObjectURL(blob);
      console.log("STOP");
      setSampleRequest({type:CONTEXT_TYPES.setSampleRequest, payload:{ ...sampleRequest, videoFile: URL }});
    };
  }

  const clickImage = () => {
    const ctx = canvas.current.getContext("2d");

    ctx.drawImage(videoRef.current, 10, 10);

    canvas.current.toBlob(
      async (blob) => {
        const imageUrl = await URL.createObjectURL(blob);
        const {snapshots} = sampleRequest;
        snapshots.push(imageUrl)
        setSampleRequest({type:CONTEXT_TYPES.setSampleRequest, payload:{...sampleRequest, snapshots: snapshots}});
        
      },
      "image/png",
      0.95
    );
  };

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 5);
    setReadingCaptions(captions[randomNumber].content);
    const REQUEST_ID =  database.ref("ALL_ENTRIES").push().key;;
    setSampleRequest({type:CONTEXT_TYPES.setSampleRequest, payload:{...sampleRequest, entryId:REQUEST_ID }});
  }, []);

  return (
    <div className="hero-container">
      <div className="search-container">
        <h2 className="hero-message">Maternal Image Based Progress Detector</h2>
        <div className="search">
          <input className="search-bar" type="text" placeholder="Search here" />
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="video-container">
        <div className="captions-container">
          <p>Read me while recording</p>
          <p className="captions">{readingCaptions}</p>
        </div>

        <div className="video">
          <h2 className="section-title">Please record your video/audio</h2>
          <div className="video-player">
            <div className="snapshots-container">
              {sampleRequest.snapshots 
              && 
              sampleRequest.snapshots.map((image) => {
                return (
                  <img
                    src={image}
                    alt="Snapshot"
                    key={image}
                    className="snap"
                  />
                );
              })}
            </div>

            {!sampleRequest.videoFile ? (
              <video muted autoPlay ref={videoRef} className="webcam-view" />
            ) : null}

            {sampleRequest.videoFile ? (
              <video
                autoPlay
                controls
                ref={videoRef}
                src={sampleRequest.videoFile}
                className="webcam-view"
              />
            ) : null}

            <div className="video-controllers" onClick={handleRecord}>
              <div className="record-start-stop-container">
                {recordingStatus === "Discard" ? (
                  <IoMdCloseCircle size="30" color="#dd523c" />
                ) : (
                  <img src={record} alt="Start Recoding" className="record" />
                )}

                <p className="record-label">{recordingStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="user-message-container">
        <textarea
          placeholder="Your thought for the day..... (Optional)"
          className="user-message"
          value={sampleRequest.comment}
          onChange={(event) => {
            setSampleRequest({type:CONTEXT_TYPES.setSampleRequest, payload:{...sampleRequest,comment: event.target.value}});
          }}
        />
        <div className="user-message-controls">
          <button
            className="submit-button"
            onClick={() => {
              sampleRequest.videoFile
                ? history.push({
                    pathname: "/questionnaire",
                    state: { request: sampleRequest },
                  })
                : alert("Please record the video first");
            }}
          >
            Submit
          </button>

          <p
            className="submit-tag"
            onClick={() => {
              history.push({
                pathname: "/questionnaire",
                state: { request: sampleRequest },
              });
            }}
          >
            Take Questionnaire
          </p>
        </div>

        <div className="questions">
          {questionsList.map((item, index) => {
            if(index < 2){
              return (
              <Questions
                key={item.question}
                question={item.question}
                options={item.options}
                sampleRequest={sampleRequest}
                setSampleRequest={setSampleRequest}
              />
            );
            }
          })}
          <div  style={{display:"flex", justifyContent:"center", alignItems:"center", cursor:'pointer', marginTop:"-2rem"}} onClick={() => {history.push({pathname:'/questionnaire', state:{request:sampleRequest}})}}>
            <p>Read More</p>
            <BsCaretRightFill />
          </div>
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
      
      <canvas
        style={{ display: "none" }}
        ref={canvas}
        width="500"
        height="500"
      ></canvas>
    </div>
  );
};

export default HeroComponent;

// (videoStream) => {
//   videoRef.current.srcObject = videoStream;
//   const temp = new MediaRecorder(videoStream);
//   if (!temp){
//     alert("I AM NOT THERE")
//   }
//   temp.start();
//   setVideoStream(videoStream);
//   setVideoRecorder(temp);
// },

// () => {
//   console.log("Something went wrong");
// }
