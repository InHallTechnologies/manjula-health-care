import React, { createRef, useContext, useEffect, useState } from 'react';
import HeroComponent from '../components/hero/hero.component';
import NavigationBar from '../components/navigation/navigation-bar.component';
import './home.styles.scss'

const HomePage = (props) => {

   
    return(
        <div className='home-container'>
            <NavigationBar  />
            <HeroComponent />

          

            {/* <FAQ /> */}

            {/* <div className='footer'>
                
            </div> */}
        </div>
    )
}

export default HomePage