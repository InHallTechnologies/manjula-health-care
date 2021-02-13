import React, {  useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import InputComponent from "../../components/input/input.component";
import { auth } from "../../firebase/firebase-handler";
import { VscLoading } from 'react-icons/vsc';

import {AiFillFacebook, AiFillTwitterSquare, AiFillLinkedin, AiFillMail} from 'react-icons/ai';

import "./login.styles.scss";
import Context from "../../context/context";
import CONTEXT_TYPES from "../../context/contectType";

const LoginScreen = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [errorSet, setErrorSet] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [authType, setAuthType] = useState("login");
 
  const [loading, setLoading] = useState(true);
  const [globalState, dispatchForGlobalState] = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((user) =>{
        if (user){
            // setRedirect({to:'/'})
          
           history.goBack();
        }
        setLoading(false)
    })
  }, []);

  const handleSignup = async () => {
    if (!credentials.name) {
      setErrorSet({ ...errorSet, name: "Please enter your name" });
      return;
    }

    if (!credentials.email) {
      setErrorSet({ ...errorSet, email: "Please enter your email id" });
      return;
    }

    if (!credentials.password) {
      setErrorSet({ ...errorSet, password: "Please enter your password" });
      return;
    }

    setLoading(true);

    try {
      const result = await auth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      );

      setLoading(false)

      if (result) {
        alert("Account Created");
        await auth.currentUser.updateProfile({
            displayName:credentials.name.trim()
        })


        dispatchForGlobalState({type:CONTEXT_TYPES.setUser, payload:{
          name:credentials.name,
          email:credentials.email
        }})
        
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
        alert(err)
        setLoading(false)
    }
  };

  const handleLogin = async () => {
    if (!credentials.email) {
      setErrorSet({ ...errorSet, email: "Please enter your email id" });
      return;
    }

    if (!credentials.password) {
      setErrorSet({ ...errorSet, password: "Please enter your password" });
      return;
    }

    setLoading(true);

    try{
      await auth.signInWithEmailAndPassword(credentials.email, credentials.password);
      setLoading(false);
     
    }catch(err){
      alert(err.message);
      setLoading(false);
    }
    
    


  };

  return (
    <div className="login-container">
    {/* {
        redirect.to?
        <Redirect to={redirect.to} />
        :
        null
    } */}
      <div className="logo-container">
        <h1 className="logo">LOGO</h1>
        <h3 className="tagline">Maternal Image Based Progress Detector</h3>

        <div className='social-container'>
          <AiFillFacebook className='social-icons' color='white' size={30} />
          <AiFillTwitterSquare className='social-icons' color='white' size={30} />
          <AiFillLinkedin className='social-icons' color='white' size={30} />
          <AiFillMail className='social-icons' color='white' size={30} />
        </div>
      </div>

      <div className="input-container">
        <h2 className="login-label">
          {authType === "login" ? "Login to continue" : "Create an account"}
        </h2>
        {authType === "login" ? null : (
          <InputComponent
            errorText={errorSet.name}
            tag={"Name"}
            value={credentials.name}
            type="name"
            name="name"
            onChange={(event) => {
              setCredentials({ ...credentials, name: event.target.value });
              setErrorSet({ ...errorSet, name: "" });
            }}
          />
        )}
        <InputComponent
          errorText={errorSet.email}
          tag={"Email Id"}
          value={credentials.email}
          type="email"
          name="email"
          onChange={(event) => {
            setCredentials({ ...credentials, email: event.target.value });
            setErrorSet({ ...errorSet, email: "" });
          }}
        />
        <InputComponent
          errorText={errorSet.password}
          tag={"Password"}
          value={credentials.password}
          type="password"
          name="password"
          onChange={(event) => {
            setCredentials({ ...credentials, password: event.target.value });
            setErrorSet({ ...errorSet, password: "" });
          }}
        />

        {
          loading?
          <VscLoading  size="40" color="white" className='auth-button' />
          :
          <button
          className="auth-button"
          onClick={authType === "login" ? handleLogin : handleSignup}
        >
          {authType === "login" ? "Login" : "Signup"}
        </button>

        }
        

        

        <p
          className="signup-label"
          onClick={() => {
            setAuthType(authType === "signup" ? "login" : "signup");
          }}
        >
          {authType === "login"
            ? "New user? Create account"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
