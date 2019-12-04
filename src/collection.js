import React from 'react';
import './collection.css';

function Collection(props) {
    return (
                <button className='collection' style={{background: props.color}} onClick={props.handleClick}>
            <h2>{props.title}</h2>
            <p>{props.length} cards</p>
        </button>
    );
}

export default Collection;