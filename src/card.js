import React from 'react';
import './card.css';

class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            onFront: true,
            front: props.front,
            back: props.back,
        }
    }

    handleClick(){
        this.setState({
            onFront: !this.onFront,
            front: this.state.back,
            back: this.state.front,
        })
    }

    render(){
        return (
            <button className="card" onClick={() => this.handleClick()}>
                {this.state.front}
            </button>
        );
    }
}

export default Card

//Display title/def text
//OnClick, switch between the two
//Track state to see if front or back is active