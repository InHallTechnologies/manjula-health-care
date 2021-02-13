import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect, useHistory, withRouter } from "react-router-dom";
import "./navigation.styles.scss";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import Context from "../../context/context";
import CONTEXT_TYPES from "../../context/contectType";
import { FaGripLinesVertical } from "react-icons/fa";
import { AiOutlineLogout } from 'react-icons/ai';
import { auth } from "../../firebase/firebase-handler";
import logo from '../../assets/logo.svg';

const NavigationBar = ({ location, }) => {
  const [redirects, setRedirects] = useState({ to: "" });
  const [hamburgerMenuVisibility, setHamburgerMenuVisibility] = useState(false);
  const [globalState, dispatchForGlobalState] = useContext(Context);
  const [showLogout, setShowLogout] = useState(false);
  const [mobileViewlogout, setMobileViewLogout] = useState(false);
  const history = useHistory();
  

  const handleLogout = async () => {
    if (globalState.userData){
        await auth.signOut()
        setShowLogout(false);
    }else{
        // setRedirects({to:'/login'})
        history.push("/login")
    }
    
  }

  const handleLogin = async () => {
    if (globalState.userData){
        await auth.signOut();
    }else {
        history.push('/login')
    }
}

  useEffect(() => {
    dispatchForGlobalState({ type: CONTEXT_TYPES.getUser });
  }, []);


  return (
    <div className="navigation-container">
      {/* {redirects.to ? <Redirect to={redirects.to} /> : null} */}
      <img  src={logo} alt='logo' className="logo"/>
      <div className="hamburger-container">

        <div className='profile-icon' onClick={() => {setMobileViewLogout(!mobileViewlogout)}}>
          <CgProfile color="white" size="25" style={{ marginLeft: "20px" }} />
        </div>
        <AiOutlineMenu
          color="#FFF"
          size="25"
          className="hamburger"
          onClick={() => {
            setHamburgerMenuVisibility(true);
          }}
        />

        

        

        {hamburgerMenuVisibility && (
          <div className="nav-container">
            <nav className="mobile-navigation">
              <AiOutlineClose
                color="black"
                size="25"
                className="hamburger-close"
                onClick={() => {
                  setHamburgerMenuVisibility(false);
                }}
              />

              
              <p
                className="nav-item"
                onClick={() => {
                  setRedirects({ ...redirects, to: "/" });
                }}
              >
                Home
              </p>
              <Link className="nav-item" to={'/reports'} onClick={() => {setHamburgerMenuVisibility(!hamburgerMenuVisibility)}}>Reports</Link>
              <Link className="nav-item" to={"/case-studies"} onClick={() => {setHamburgerMenuVisibility(!hamburgerMenuVisibility)}}>
              My Resources/Case Studies
              </Link>
              <div className="separator"></div>
              <p className="nav-item" onClick={() => {window.location.href = 'mailto:gethelp@eazynurture.com'}}>Contact Us</p>

                

            </nav>
          </div>
        )}
      </div>
      <nav className="navigation">
        <p
          className="nav-item"
          onClick={() => {
            setRedirects({ ...redirects, to: "/" });
          }}
        >
          Home
        </p>
        <Link className="nav-item" to={'/reports'}>Reports</Link>
        <Link className="nav-item" to={"/case-studies"}>
          My Resources/Case Studies
        </Link>
        <div className="separator">
          <FaGripLinesVertical color="white" size={20} />
        </div>
        <p className="nav-item" onClick={() => {window.location.href = 'mailto:gethelp@eazynurture.com'}}>Contact Us</p>
        <div
          onClick={handleLogout}
          
          onMouseOver={() => {
              if (globalState.userData){
                setShowLogout(true);
              }
            
          }}

          onMouseOut={() => {
              if (globalState.userData){
                setShowLogout(false);
              }
            
          }}
          className="profile-circle"
        >
          <p className="user-name">{showLogout?"Logout": globalState.userData? globalState.userData.name:"Login" }</p>
          {
              showLogout?
              <AiOutlineLogout color="white" size="25" style={{ marginLeft: "20px" }} />
              :
              <CgProfile color="white" size="25" style={{ marginLeft: "20px" }} />
          }
         
        </div>
      </nav>
      {
        mobileViewlogout
        &&
        <div className='mobile-view-logout'>
          <p className='name'>{globalState.userData && globalState.userData.name}</p>
          <p className='logout' onClick={handleLogin}>{globalState.userData?"Logout":"Login"}</p>
        </div>         
      }
    </div>
  );
};

export default withRouter(NavigationBar);
