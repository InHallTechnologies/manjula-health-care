import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/navigation/navigation-bar.component';        
import staticData from '../case-studies/staticData';
import './case-studies-details.styles.scss'
import {AiFillEye} from 'react-icons/ai'
const CaseStudiesDetails = props => {
    const ID =  (props.match.params.id)

    const [loading, setLoading] = useState(true);
    const [article, setArticle] = useState({});

    useEffect(() => {
        const articleStatus =  staticData.find((data) => {
            if (data.title === ID){
                return data;
            }
        })

        setArticle(articleStatus);
    }, [])

    return (
        <div className='article-detail-container'>
            <NavigationBar />
            <div className='image-container'>
                <img src={article.imageUrl} alt={article.title} className='article-picture' />
                <img src={article.imageUrl} alt={article.title} className='article-picture-bg' />
            </div>
            
            <div className='content-container'>
                <h2>{article.title}</h2>
                <p>{article.content}</p>
            </div>

            <div className='content-detail-container'>
                <p className='detail'>{`By: ${article.author}`}</p>
                <p style={{fontSize:"15px", color:'#bababa', display:'flex'}} className='detail'> <AiFillEye size='17' style={{marginRight:"6px"}} /> {`${article.numOfViews}`}</p>
                <p className='detail'>{`Referenced By: ${article.referencedBy} `}</p>
            </div>
        </div>
    )
}

export default CaseStudiesDetails;