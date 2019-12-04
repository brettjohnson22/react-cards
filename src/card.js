import React from 'react';
import './card.css';

class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            front: props.front,
            back: props.back,
            id: props.id
        }
    }

    //Flips card when clicked

    handleClick(){
        this.setState({
            front: this.state.back,
            back: this.state.front,
        });
    }

    //Forces rerender of card when given new props.

    componentWillReceiveProps(props){
        this.setState({
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