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
        console.log(err);
        alert("Invalid credentials")
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
        console.log(err);
        alert(err.message)
        setLoading(false);
      }
     
    })();
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
          <InputComponent type='email' value={credentials.password} onChange={(event) =>{setCredentials({...credentials, password: event.target.value })}} viewType="TEXT" tag="Password" type="password" />
          {
            !loading
            ?
            <button onClick={handleLogin} className='login-button submit-button'>Login</button>
            :
            <div className='submit-button login-button '>
              <VscLoading color='white' size='20' />
            </div>
          }
         
          <p onClick={handleSignup} className='signup-button'>Create Account</p>

         
        </div>
      </div>
    </div>
  );
};

export default DoctorsOnboard;
