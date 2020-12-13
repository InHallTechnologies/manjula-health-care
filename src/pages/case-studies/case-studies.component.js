import React, { useEffect, useState } from 'react';
import './case-studies.styles.scss'
import NavigationBar from '../../components/navigation/navigation-bar.component';
import staticData from './staticData';
import CaseStudiesListArch from '../../components/case-studies-list-arch/case-studies-list-arch.component';


const CaseStudies = (props) => {
    const [caseStudiesList, setCaseStudiesList] = useState([]);

    useEffect(() => {
        setCaseStudiesList(staticData)
    }, [])

    return (
        <div className='case-studies-container'>
            <NavigationBar />  

            <div className='case-studies'>
                <h2 className='title'>Learn from my resources/case studies</h2>

                <div className='case-studies-list'>
                    {
                        caseStudiesList.map((item) => {
                            return <CaseStudiesListArch title={item.title} imageUrl={item.imageUrl} author={item.author} numOfViews={item.numOfViews} />
                        })
                    }
                </div>
            </div> 
        </div>
    )
}

export default CaseStudies;