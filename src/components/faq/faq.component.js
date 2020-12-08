import React, { useState } from 'react'
import FAQ_Arch from '../faq-arch/faq-arch.component';
import './faq.styles.scss';

const FAQ = props => {

    const [faqs, setFaqs] = useState([1,2,3,4,5]);
    
    

    return(
        <div className='faq-container'>
            <div className='faq-content'>
                <h2 className='section-title'>FAQ</h2>

                <div className='faqs'>
                {
                    faqs.map((item, index) => {
                        return <FAQ_Arch title='This is title' content='this is content' key={index.toString()} />
                    })
                }
                </div>
            
            </div>
        </div>
    )
}

export default FAQ;