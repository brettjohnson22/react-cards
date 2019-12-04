import React from 'react';
import './card.css';

function Card(props){
    return (
        <button className="card" onClick={props.handleClick}>
            <h1>{props.text.toUpperCase()}</h1>
            <p>{(props.id + 1)}</p>
        </button>
    );
}

export default Card