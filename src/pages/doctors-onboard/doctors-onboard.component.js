import React, { useEffect, useState } from "react";
import "./doctors-onboard.styles.scss";
import doctor from "../../assets/doctor.jpg";
import InputComponent from "../../components/input/input.component";
import { auth } from "../../firebase/firebase-handler";
import { VscLoading } from 'react-icons/vsc'
import { useHistory } from "react-router-dom";
import { RiTeamLine } from 'react-icons/ri';

const DoctorsOnboard = (props) => {
  const [credentials, setCredentials] = useState({emaild:"", password:''})
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [currentOption, setCurrentOption] = useState("LOGIN");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user){
        history.push('/signup')
      }
    })

  }, [])

  const handleLogin = () => {
    (async () => {
      setLoading(true);
      try{
        await auth.signInWithEmailAndPassword(credentials.emaild, credentials.password);
        setLoading(false);
       
      }catch(err){
        if (!credentials.emaild){
          alert("Please enter a valid email Id");
        }else if (!credentials.password){
          alert("Please enter your password");
        }else{
          alert(err)
        }
        setLoading(false);
      }
     
    })();
    
  }
  
  const handleSignup = () => {
    (async () => {
      setLoading(true);
      try{
        await auth.createUserWithEmailAndPassword(credentials.emaild, credentials.password);
        setLoading(false);
        
      }catch(err){
        if (!credentials.emaild){
          alert("Please enter a valid email Id");
        }else if (!credentials.password){
          alert("Please enter your password");
        }else{
          alert(err)
        }
        setLoading(false);
      }
     
    })();
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter"){
      if (currentOption === "LOGIN"){ 
      handleLogin();
      }else{
        handleSignup()
      }
    }
  }

  const handleForgotPassword = async () =>{
    if (credentials.emaild){
      try{
        await auth.sendPasswordResetEmail(credentials.emaild);
        alert("A reset password link is sent to your email id. Please click on the link to reset your password.")
      }catch(err){
        switch(err.code){
          case 'auth/invalid-email':{
            alert('Please enter a valid email id.');
            break;
          }
          case "auth/user-not-found":{
            alert("No account found for this email address. Please enter a different email id or create account to continue.");
            break
          }
        }
      }
     
    }else{
      alert("Please enter your registered email id.");
    }
   
  }

  const handleTNCClicked = () => {
    window.open("https://firebasestorage.googleapis.com/v0/b/health-wealth-a6ae7.appspot.com/o/TNC%2FTerms%20of%20Service%C2%B7Privacy%20Policy.pdf?alt=media&token=507c8dac-4573-4120-bda4-d09c99b89386")
  }


  return (
    <div className="doctor-onboard-container">
      <img className="illustration" src={doctor} alt="doctor" /> 
      <div className='onboard-forms'>
          <div className='meet-the-tem-container' onClick={() => {history.push('meet-team')}}>
            <RiTeamLine color='#444' size={24} />
            <p>Meet the team</p>
          </div>
        <p className='login-label'>Login to your account</p>
        <div className='onboard-input-container'>
        
          <InputComponent value={credentials.emaild} onChange={(event) =>{setCredentials({...credentials, emaild: event.target.value })}} viewType='TEXT' tag="Email Id" />
          <InputComponent onKeyPressEvent={handleKeyPress} type='email' value={credentials.password} onChange={(event) =>{setCredentials({...credentials, password: event.target.value })}} viewType="TEXT" tag="Password" type="password" />
          {
            !loading
            ?
            <button onClick={currentOption==="LOGIN"?handleLogin:handleSignup} className='login-button'>{currentOption==="LOGIN"?"Login":"Create Account"}</button>
            :
            <div className='submit-button login-button '>
              <VscLoading color='white' size='20' />
            </div>
          }
          
          {
            currentOption === "LOGIN"
            ?
            <p className='forgot-password-label' onClick={handleForgotPassword} >Forgot Password?</p>
            :
            null
          }
          
          {
            currentOption === "LOGIN"
            ?
            <p style={{textAlign:'center', margin:0, marginTop:20}}>Don't have an account?</p>
            :
            <p style={{textAlign:'center', margin:0, marginTop:20}}>Already have an account?</p>
          }
          <p onClick={() => {setCurrentOption(currentOption==="LOGIN"?"SIGNUP":"LOGIN")}} className='signup-button'>{currentOption!=="LOGIN"?"Login":"Create Account"}</p>

          <div className='tnc-container'>
              <p className='tnc-label'>By continuing you agree to our <br/><span className='tnc' onClick={handleTNCClicked}>Terms & Condition and Privacy Policy</span> </p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default DoctorsOnboard;
