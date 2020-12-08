import React from 'react'
import './questions.styles.scss'

const Questions = ({question, options}) => {
    return(
        <div className='question-container'>
            <p className='question'>{question}</p>
            <div className='options-container'>
                {
                    options.map((item) => {
                        return <div className='option'><input type='radio' name={question} /><p style={{margin:"0px", marginLeft:"5px", marginTop:"1px"}}>{item}</p></div>
                    })
                }
            </div>
        </div>
    )
}

export default Questions