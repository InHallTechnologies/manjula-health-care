import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import NavigationBar from "../../components/navigation/navigation-bar.component";
import questionsList from "../../components/questions/questionList";
import Questions from "../../components/questions/questions.component";
import CONTEXT_TYPES from "../../context/contectType";
import Context from "../../context/context";
import SAMPLE_FORM_ENTRY from "../../enteties/sampleFormEntry";
import { auth, database, storage } from "../../firebase/firebase-handler";
import "./questionnaire.styles.scss";


const QuestionnaireScreen = (props) => {
  const [sampleRequest, setSampleRequest] = useState(SAMPLE_FORM_ENTRY);
  const [globalState, dispatchForGlobalState] = useContext(Context);
  const [uploadingDetails, setUploadingDetails] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatchForGlobalState({ type: CONTEXT_TYPES.getUser });
    if (props.location.state){
        setSampleRequest({ ...props.location.state.request });
    }
    
  }, []);

  const handleSubmit = async () => {
    if (globalState.userData) {
     
      const {sampleRequest} = globalState;
      console.log(sampleRequest)
      setUploadingDetails(true);
      const imageUrls = [];
      const firebaseUser = auth.currentUser;
      //upload Image
      sampleRequest.snapshots.forEach( async (imageBlob, index) => {
        const imageResponse = await fetch(imageBlob);
        const imageBlobLoaded = await imageResponse.blob();
        const imageSnap =  await storage.ref("ALL_ENTRIES").child(sampleRequest.entryId).child(`IMAGE${index+1}`).put(imageBlobLoaded);
        const IMAGE_URL = await imageSnap.ref.getDownloadURL();
        imageUrls.push(IMAGE_URL);
        setUploadProgress(uploadProgress + 5);
      })

      //upload Video
      const response = await fetch(sampleRequest.videoFile);
      const videoBlob = await response.blob();
      const videoSnap =  await storage.ref("ALL_ENTRIES").child(sampleRequest.entryId).child("VIDEO").put(videoBlob);
      const videoUrl = await videoSnap.ref.getDownloadURL();
      setUploadProgress(uploadProgress + 10);


      const FINAL_REQUEST = {
        ...sampleRequest,
        snapshots:imageUrls,
        videoFile:videoUrl,
        name:firebaseUser.displayName,
        emailId:`${firebaseUser.email}`,
      }
      setUploadProgress(90);
      try {
        await database.ref("ALL_ENTRIES").child(FINAL_REQUEST.entryId).set(FINAL_REQUEST);
        alert("Request Submitted");
      } catch(e) {
        console.log(e)
      }

      setUploadProgress(100);
      setUploadingDetails(false);

    } else {
      alert("Please login to submit the form");
    }
  };

  
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
        {
          !uploadingDetails?
          <button className="submit" onClick={handleSubmit}>
          Submit
          </button>
          :
          <div>
            <label for="uploadProgress" >Saving details</label>
            <progress id="uploadProgress" value={uploadProgress} max={100} style={{marginLeft:13}} />
          </div>
        }
        

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
