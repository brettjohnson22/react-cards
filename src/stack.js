import React from 'react';
import './stack.css';

// class Stack extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             title: props.title,
//             active: false,
//             color: ''
//         }
//     }

//     changeColor(){
//         var newColor = this.state.color === '' ? 'blue' : '';
//         this.setState({ color: newColor})
//     }

//     handleClick(){
//         this.setState({
//             active: !this.state.active,
//         });
//         this.props.handleClick();
//         // this.changeColor();
//     }

//     render(){
//         return(
//         <button className='stack' style={{background: this.props.color}} onClick={() => this.props.handleClick}>
//             <h2>{this.props.title}</h2>
//         </button>
//         )
//     }
// }


function Stack(props) {
    return (
                <button className='stack' style={{background: props.color}} onClick={props.handleClick}>
            <h2>{props.title}</h2>
        </button>
    );
}


export default Stack;





