import React from 'react';
import axios from 'axios';


class PostFormMongo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            def: '',
            selectedOption: "Add"
        };

        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDefChange = this.handleDefChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRadioChange(event){
        this.setState({selectedOption: event.target.value})
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleDefChange(event) {
        this.setState({def: event.target.value});
    }

    handleSubmit() {

        const newCard = {
            word: this.state.title,
            definition: this.state.def
        };

        if(this.state.selectedOption === "Add"){
        
            axios.post('http://localhost:5000/api/collections/' + this.props.collectionId + '/cards', newCard )
        .then(res => {
            console.log(res);
        });
        }
        else if (this.state.selectedOption === "Edit"){
            axios.put('http://localhost:5000/api/collections/' + this.props.collectionId + '/cards/' + this.props.cardId, newCard )
            .then(res => {
                console.log(res);
            });

        }
        else if (this.state.selectedOption === "Delete"){
            axios.delete('http://localhost:5000/api/collections/' + this.props.collectionId + '/cards/' + this.props.cardId)
        }
    }



    render(){
        return (
            <form onSubmit= {this.handleSubmit}>
                
                <label>
                    Title:
                    <input type="text" name="title" value={this.state.title} onChange={this.handleTitleChange}/>
                </label>
                <label>
                    Definition:
                    <input type="text" name="def" value={this.state.def} onChange={this.handleDefChange}/>
                </label>
                <div className="radio">
                
          <label>
            <input
              type="radio"
              value="Add"
              checked={this.state.selectedOption === "Add"}
              onChange={this.handleRadioChange}
            />
            Add New Card
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Edit"
              checked={this.state.selectedOption === "Edit"}
              onChange={this.handleRadioChange}
            />
            Edit Current Card
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Delete"
              checked={this.state.selectedOption === "Delete"}
              onChange={this.handleRadioChange}
            />
            Delete Current Card
          </label>
        </div>
                <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
            </form>
        )
    }
}

export default PostFormMongo