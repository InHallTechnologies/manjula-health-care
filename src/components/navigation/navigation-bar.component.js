import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import './navigation.styles.scss'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const NavigationBar = ({history, location}) => {

    const [redirects, setRedirects] = useState({to:""});
    const [hamburgerMenuVisibility, setHamburgerMenuVisibility] = useState(false);


   

    return(
        <div className='navigation-container'>
            {
                redirects.to?
                <Redirect to={redirects.to}/>
                :
                null
            }
            <h1 className='logo'>LOGO</h1>
            <div className='hamburger-container'>
                <AiOutlineMenu color='#FFF' size="25"  className='hamburger' onClick={() => {setHamburgerMenuVisibility(true)}} />

                {
                    hamburgerMenuVisibility
                    &&
                    <div className='nav-container'>
                    <nav className='mobile-navigation'>
                        <AiOutlineClose color='black' size="25"  className='hamburger-close' onClick={() => {setHamburgerMenuVisibility(false)}} />
                        <p className='nav-item' onClick={() => {setRedirects({...redirects, to:"/"})}}>Home</p>
                        <p className='nav-item' >Reports</p>
                        <Link className='nav-item' to={'/case-studies'}>Case Studies</Link>
                        <div className='separator'></div>
                        <p className='nav-item'>Help</p>
                        <p className='nav-item'>Raise Concern</p>
                    </nav>
                    </div>
                }
               
            </div>
            <nav className='navigation'>
                <p className='nav-item' onClick={() => {setRedirects({...redirects, to:"/"})}}>Home</p>
                <p className='nav-item' >Reports</p>
                <Link className='nav-item' to={'/case-studies'}>Case Studies</Link>
                <div className='separator'></div>
                <p className='nav-item'>Help</p>
                <p className='nav-item'>Raise Concern</p>
            </nav>
        </div>
    )
}

export default withRouter(NavigationBar)