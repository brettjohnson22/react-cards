import React from 'react';
import ReactDOM from 'react-dom';
import Card from './card.js';
import Stack from './stack.js';
import PostForm from './postform.js';
import axios from 'axios';
import './index.css';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sideActive: Array(2).fill('red'),
            stackActive: null,
            currentCard: 0,
            data: [],
            title: '',
            def: ''    
            };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    //Axios get to create data for cards

    componentWillMount(){
        axios.get('data.json')
        .then(res => {
            const data = res.data;
            this.setState({
                data: data.collections
            });
        });
    }

    //Sets active stack when clicking on stack in sidebar, sets sideActive array to have 

    stackClick(i) {
        const sideActive= Array(2).fill('red');
        sideActive[i - 1] = 'blue';
        this.setState({
            sideActive: sideActive,
            stackActive: i - 1,
            currentCard: 0
        });
    }

    //Renders a single stack based on collection from data, color based on sideActive array

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

    //Creates sidebar div and fills it with a stack for each collection in the data

    createStacks() {
        return (
            <div className='sideBar' >
                {this.state.data.map(item => this.renderStack(item)
                )} 
             </div>
        );
    }

    //Renders active card from active stack

    renderCardAndArrows(id){
        if(this.state.stackActive == null){
            return(
                <div></div>
            );
        }
        else{
        return(
                <div>
                <button className="leftArrow" onClick={() => this.leftArrow()}> 
                    <p> Prev </p>
                </button> 
                <Card front={this.state.data[this.state.stackActive].cards[id].word}
                back={this.state.data[this.state.stackActive].cards[id].definition}
                id={id}
                />
                <button className="rightArrow" onClick={() => this.rightArrow()}> 
                    <p> Next </p>
                </button>
                </div>
            );
        }
    }

    //Arrow functions are the onClicks of the arrow buttons that change state.currentCard.

    leftArrow(){
        if(this.state.currentCard === 0){
            this.setState({
                currentCard: (this.state.data[this.state.stackActive].cards.length - 1)
            });
        }
        else{
        this.setState({
            currentCard: (this.state.currentCard -1)
            });
        }
    }

    rightArrow(){
        if(this.state.currentCard === (this.state.data[this.state.stackActive].cards.length - 1)){
            this.setState({
                currentCard: 0
            });
        }
        else{
        this.setState({
            currentCard: (this.state.currentCard +1)
            });
        }
    }

    //Axios postform logic

    renderPostForm(){
        if(this.state.stackActive == null)
        {
            return(<div></div>);
        }
        else
        {
            return(
                <PostForm onSubmit={this.handleSubmit}></PostForm>
            );
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {

        event.preventDefault();

        const newCard = {
            id: (this.state.data[this.state.stackActive].cards.length + 1),
            title: this.state.title,
            def: this.state.def
        };
        console.log(newCard);

        axios.post('data.json', {newCard})
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
    }

    
    render (){ 
            return(
            <div>
            {this.createStacks()}
            {this.renderCardAndArrows(this.state.currentCard)}
            {this.renderPostForm()}
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