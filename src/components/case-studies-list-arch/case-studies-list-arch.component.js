import React from 'react';
import './case-studies-list-arch.styles.scss'
import {AiFillEye} from 'react-icons/ai'
import { withRouter } from 'react-router-dom';

const CaseStudiesListArch = (props) => {
    const  {imageUrl, title, author, numOfViews, history, location} = props;
    // pathname
    return(
       <div className='case-studies-list-arch-container' onClick={() => {history.push((location.pathname+"/"+title).replace("//","/"))}}>
           <img  className='image' src={imageUrl} alt={`${title}-post`}  />
           <p className='title' style={{fontSize:"20px"}}>{title}</p>

           <hr className='separator'/>

           <div className='post-data'>
               <p style={{fontSize:"15px", color:'#bababa'}} className='data'> <AiFillEye size='17' style={{marginRight:"6px"}} /> {`${numOfViews}`}</p>
               <p style={{fontSize:"15px,", color:'#bababa'}} className='data'>{`By: ${author}`}</p>
           </div> 
       </div> 
    )
}

export default withRouter(CaseStudiesListArch);