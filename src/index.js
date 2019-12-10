import React from 'react';
import ReactDOM from 'react-dom';
import Card from './card.js';
import Collection from './collection.js';
import PostForm from './postform.js';
import axios from 'axios';
import './index.css';



class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collActive: null,
            currentCard: 0,
            frontOfCard: true,
            data: []  
            };

        this.handleChange = this.handleChange.bind(this);
    }

    //Axios get to create data for cards and sideActive array which will inform which color to display

    componentDidMount(){
        axios.get('http://localhost:3000/collections')
        .then(res => {
            const data = res.data;
            this.setState({
                data: data,
                sideBarActive: Array(data.length).fill('red')
            });
        });
    }

    //Creates sidebar div and fills it with a collection for each collection in the data

    createCollections() {
        return (
            <div className='sideBar' >
                <h3 className="titleHead">Collections</h3>
                {this.state.data.map(item => this.renderCollection(item)
                )} 
             </div>
        );
    }

    //Renders a single collection based on collection from data, color based on sideActive array

    renderCollection(item){
        return (
            <Collection
            title={item.title}
            key={item.id}
            color= {this.state.sideBarActive[item.id - 1]}
            length={item.cards.length}
            handleClick={() => this.collectionClick(item.id)}
            />
        );
    }

    //Sets active collection when clicking in sidebar, resets sideBarActive array to display correct color for each collection

    collectionClick(i) {
        const sideBarActive= Array(this.state.data.length).fill('red');
        sideBarActive[i - 1] = 'blue';
        this.setState({
            sideBarActive: sideBarActive,
            collActive: i - 1,
            currentCard: 0,
            frontOfCard: true
        });
    }

    //Renders active card from active collection and arrows that traverse collection

    renderCardAndArrows(id){
        if(this.state.collActive == null){
            return(
                <div></div>
            );
        }
        else{
            if(this.state.frontOfCard){
                return(
                    <div>
                    <button className="leftArrow" onClick={() => this.leftArrow()}> 
                        <p> Prev </p>
                    </button> 
                    <Card text={this.state.data[this.state.collActive].cards[id].word}
                    id={id}
                    handleClick={() => this.handleFlip()}
                    />
                    <button className="rightArrow" onClick={() => this.rightArrow()}> 
                        <p> Next </p>
                    </button>
                    </div>
                );
            }
            else{
                return(
                    <div>
                    <button className="leftArrow" onClick={() => this.leftArrow()}> 
                        <p> Prev </p>
                    </button> 
                    <Card text={this.state.data[this.state.collActive].cards[id].definition}
                    id={id}
                    handleClick={() => this.handleFlip()}
                    />
                    <button className="rightArrow" onClick={() => this.rightArrow()}> 
                        <p> Next </p>
                    </button>
                    </div>
                );
            }
        }
    }

    handleFlip(){
        this.setState({
            frontOfCard: !this.state.frontOfCard
        });
    }

    //Arrow functions are onClicks of the above arrow buttons that change state.currentCard and goes to other end of collection when reaching end.

    leftArrow(){
        if(this.state.currentCard === 0){
            this.setState({
                currentCard: (this.state.data[this.state.collActive].cards.length - 1),
                frontOfCard: true
            });
        }
        else{
        this.setState({
            currentCard: (this.state.currentCard -1),
            frontOfCard: true
            });
        }
    }

    rightArrow(){
        if(this.state.currentCard === (this.state.data[this.state.collActive].cards.length - 1)){
            this.setState({
                currentCard: 0,
                frontOfCard: true
            });
        }
        else{
        this.setState({
            currentCard: (this.state.currentCard +1),
            frontOfCard: true
            });
        }
    }

    //Axios postform logic

    renderPostForm(){
        if(this.state.collActive == null)
        {
            return(<div></div>);
        }
        else
        {
            return(
                <PostForm data={this.state.data} collActive={this.state.collActive} id={this.state.data[this.state.collActive].cards.length}></PostForm>
            );
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }


    render (){ 
            return(
            <div>
            {this.createCollections()}
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