import React from 'react';



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
        this.props.handleSubmit();
        event.preventDefault();
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