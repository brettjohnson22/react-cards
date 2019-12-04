import React from 'react';
import './stack.css';


function Stack(props) {
    return (
                <button className='stack' style={{background: props.color}} onClick={props.handleClick}>
            <h2>{props.title}</h2>
            <p>{props.length} cards</p>
        </button>
    );
}


export default Stack;





