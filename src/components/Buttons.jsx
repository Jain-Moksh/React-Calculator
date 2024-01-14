import React from 'react';

function Button(props) {
    return (
        <div className='border-2 px-6 py-5' onClick={() => {
            props.dispatch({ type: props.type, payLoad: props.val });
        }} >
            {props.val}
        </div>
    );
}

export default Button;