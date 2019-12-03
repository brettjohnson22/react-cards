import React from 'react';



class PostForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            def: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
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
                    <input type="text" name="title" />
                </label>
                <label>
                    Definition:
                    <input type="text" name="def" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default PostForm