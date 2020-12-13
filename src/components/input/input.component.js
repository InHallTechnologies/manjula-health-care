import React from "react";
import './input.styles.scss';

const InputComponent= ({tag, placeholder, type, onChange, value ,name, style, errorText}) => {

    return(
        <div className='custom-input-container' style={style}>
            <p className='tag'>{tag}</p>
            <input className='custom-input' placeholder={placeholder} type={type} onChange={onChange}  value={value} name={name} />
            {
                errorText?
                <p className='error-text'>{errorText}</p>
                :
                null
            }
        </div>
    )
}

export default InputComponent;