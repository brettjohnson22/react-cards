import React from 'react';
import ReactDOM from 'react-dom';
import Card from './card.js';
import Stack from './stack.js';
import PostForm from './postform.js';
import axios from 'axios';
import './index.css';


//state.title/def are values from postform 

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //sideActive: Array(2).fill('red'),
            stackActive: null,
            currentCard: 0,
            data: [],
            title: '',
            def: ''    
            };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Axios get to create data for cards and sideActive array which will inform 

    componentDidMount(){
        axios.get('data.json')
        .then(res => {
            const data = res.data;
            this.setState({
                data: data.collections,
                sideBarActive: Array(data.collections.length).fill('red')
            });
        });
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

    //Renders a single stack based on collection from data, color based on sideActive array

    renderStack(item){
        return (
            <Stack
            title={item.title}
            value={item.id}
            color= {this.state.sideBarActive[item.id - 1]}
            length={item.cards.length}
            handleClick={() => this.stackClick(item.id)}
            />
        );
    }

    //Sets active stack when clicking on stack in sidebar, resets sideBarActive array to display correct color for each stack

    stackClick(i) {
        const sideBarActive= Array(this.state.data.length).fill('red');
        sideBarActive[i - 1] = 'blue';
        this.setState({
            sideBarActive: sideBarActive,
            stackActive: i - 1,
            currentCard: 0
        });
    }

    //Renders active card from active stack and arrows that traverse collection

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

    //Arrow functions are onClicks of the above arrow buttons that change state.currentCard and goes to other end of collection when reaching end.

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