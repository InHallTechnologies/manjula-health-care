import React, { useState } from 'react';
import arrow from '../../assets/next.svg';

const FAQ_Arch = ({title, content}) => {

    const [openedState, setOpenedState] = useState(false);

    return (
        <div style={{marginTop:"10px", background:'#dff7ee', borderRadius:10, paddingLeft:"20px"}}>
            <div onClick={() => {setOpenedState(!openedState)}} style={{display:'flex', }}>
                <img src={arrow} alt='drop-down-arrow' className='arrow' style={{width:"16px", marginRight:"20px"}}  />
                <h2 style={{fontSize:"1.1rem"}}>{title}</h2>
            </div>

            {
                openedState?
                <p>{content}</p>
                :
                null
            }
        </div>
    )
}

export default FAQ_Arch;