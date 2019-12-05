import React from 'react';
import axios from 'axios';


class PostForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            def: ''
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDefChange = this.handleDefChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleDefChange(event) {
        this.setState({def: event.target.value});
    }

    handleSubmit(event) {

        event.preventDefault();

        const newCard = {
            id: this.props.id + 1,
            word: this.state.title,
            definition: this.state.def
        };

        var obj = this.props.data;
        var collObj = obj[this.props.collActive];
        collObj.cards.push(newCard);

        axios.put('http://localhost:3000/collections/' + (this.props.collActive), collObj )
        .then(res => {
            console.log(res);
        });
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={this.state.title} onChange={this.handleTitleChange}/>
                </label>
                <label>
                    Definition:
                    <input type="text" name="def" value={this.state.def} onChange={this.handleDefChange}/>
                </label>
                <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
            </form>
        )
    }
}

export default PostForm