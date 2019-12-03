import React from 'react';
import './card.css';

class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            onFront: true,
            front: props.front,
            back: props.back,
            id: props.id
        }
    }

    handleClick(){
        this.setState({
            onFront: !this.onFront,
            front: this.state.back,
            back: this.state.front,
        })
    }

    componentWillReceiveProps(props){
        this.setState({
            onFront: true,
            front: props.front,
            back: props.back,
        });
    }


    
    render(){
        return (
            <button className="card" onClick={() => this.handleClick()}>

                <h1>{this.state.front.toUpperCase()}</h1>
                <p>{(this.props.id + 1)}</p>
            </button>

        );
    }
}

export default Card

//Display title/def text
//OnClick, switch between the two
//Track state to see if front or back is active