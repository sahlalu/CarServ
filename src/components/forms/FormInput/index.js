import React from 'react';
import './styles.scss';

const FormInput = ({handleChange, label, required, ...otherProps}) => {
    return(
        <div className='formRow'>
            {label && (
                <label>
                    {label}
                </label>
            )

            }
            <input className='formInput' onChange={handleChange} {...otherProps} required={required}></input>
        </div>
    );
}

export default FormInput;