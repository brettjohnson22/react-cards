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
            data: data
        };
    }

    stackClick(i) {
        const sideActive= Array(2).fill('red');
        sideActive[i - 1] = 'blue';
        this.setState({
            sideActive: sideActive
        });
    }

    renderStack(item){
        return (
            <Stack
            title={item.title}
            value={item.id}
            color= {this.state.sideActive[item.id - 1]}
            handleClick={() => this.stackClick(item.id)}
            />
        );
    }

    // renderSidebar(active){
    //     return <Sidebar data={data} active={active} handleClick={() => this.sideClick()} />
    // }

    renderSidebar() {
        return (
            <div className='sideBar' >
                {this.state.data.collections.map(item => this.renderStack(item)
                )} 
             </div>
        );
    }

    renderCard(title){
        return(
            <Card front={title}
            back="Test back"
            />
        )
    }


    render (){ 
        return(
        <div>
        {this.renderSidebar()}
        {this.renderCard(this.state.current)}
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