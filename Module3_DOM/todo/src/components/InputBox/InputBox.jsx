import React, { Component } from 'react'

class InputBox extends Component {
    state = {
        todoData:""
    }
    
    handleOnChange = (e)=>{
        let value = e.target.value;
        this.setState({
            todoData:value
        })
    }

    handleAddTodo = (e) => {
        let value = this.state.todoData;
        this.setState({
            todoData:""
        })
        this.props.addTodo(value);
    }
    render() { 
        return ( 
            <div className="input-container">
                <div className="todo input-group mt-4 mb-4">
                    <input type="text" value={this.state.todoData} className="form-control" onChange={this.handleOnChange} placeholder="Add Todo"/>
                    <button className="btn btn-primary" onClick={this.handleAddTodo}>Add</button>
                </div>
            </div>
         );
    }
}
 
export default InputBox;