import React from 'react';
import ReactDOM from 'react-dom';
//import Sidebar from './sidebar.js';
import Card from './card.js';
import Stack from './stack.js';
import './index.css';
import './sidebar.css';
import './data.json';

let data = require('./data.json')
//console.log(data.collections)

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sideActive: Array(2).fill('red'),
            stackActive: null,
            currentCard: 0,
            data: data
        };
    }

    stackClick(i) {
        const sideActive= Array(2).fill('red');
        sideActive[i - 1] = 'blue';
        this.setState({
            sideActive: sideActive,
            stackActive: i - 1,
            currentCard: 0
        });
    }

    renderStack(item){
        return (
            <Stack
            title={item.title}
            value={item.id}
            color= {this.state.sideActive[item.id - 1]}
            length={item.cards.length}
            handleClick={() => this.stackClick(item.id)}
            />
        );
    }

    // renderSidebar(active){
    //     return <Sidebar data={data} active={active} handleClick={() => this.sideClick()} />
    // }

    createStacks() {
        return (
            <div className='sideBar' >
                {this.state.data.collections.map(item => this.renderStack(item)
                )} 
             </div>
        );
    }

    leftArrow(){
        if(this.state.currentCard === 0){
            this.setState({
                currentCard: (this.state.data.collections[this.state.stackActive].cards.length - 1)
            })
        }
        else{
        this.setState({
            currentCard: (this.state.currentCard -1)
            })
        }
    }

    rightArrow(){
        if(this.state.currentCard === (this.state.data.collections[this.state.stackActive].cards.length - 1)){
            this.setState({
                currentCard: 0
            })
        }
        else{
        this.setState({
            currentCard: (this.state.currentCard +1)
            })
        }
    }

    renderCardAndArrows(id){
        if(this.state.stackActive == null){
            return(
                <div></div>
            )
        }
        else{
        return(
                <div>
                <button className="leftArrow" onClick={() => this.leftArrow()}> 
                    <p> Prev </p>
                </button> 
                <Card front={this.state.data.collections[this.state.stackActive].cards[id].word}
                back={this.state.data.collections[this.state.stackActive].cards[id].definition}
                id={id}
                />
                <button className="rightArrow" onClick={() => this.rightArrow()}> 
                    <p> Next </p>
                </button>
                </div>
            )
        }
    }
    

    render (){ 
        return(
        <div>
        {this.createStacks()}
        {this.renderCardAndArrows(this.state.currentCard)}
        </div>
    );
    }
}





ReactDOM.render(
    <App />,
    document.getElementById('root')
);




//I want to click on a stack, which will then render a new card with that title
//