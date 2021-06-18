import React, { Component } from 'react'


class TodosList extends Component {
    state = {}

    render() { 
        let todos = this.props.todos;
        let deleteTodo = this.props.deleteTodo;
        return ( 
            <div className="todos-container">
                {todos.map(function(todoObj){
                    return(
                        <div className="todo input-group mt-4 mb-4" key={todoObj.id}>
                            <div className="form-control">{todoObj.todo}</div>
                            <button className="btn btn-danger" onClick={()=>{deleteTodo(todoObj.id)}}>delete</button>
                        </div>
                    );
                })}
                    
            </div>
         );
    }
}
 
export default TodosList;