import React, { Component } from 'react';
// import ReactDom from "react-dom";
import InputBox from "./components/InputBox/InputBox";
import TodosList from "./components/TodosList/TodosList";


class App extends Component {
    state = {
        todos:[
            {id:1, todo:"Learn Jsx"},
            {id:2, todo:"Learn CSS"},
            {id:3, todo:"Learn JS"},
            {id:4, todo:"Learn React"},
            {id:5, todo:"Learn ES6"}
        ]
    }

    deleteTodo = (id) =>{
        let updatedTodo = this.state.todos.filter((todoObj)=>{
            if(todoObj.id!=id)
                return true;
            else
                return false;
        })
        this.setState({
            todos:updatedTodo,
        })
    }

    addTodo = (todoData) => {
        let oldTodos = this.state.todos;

        let todoObj = {
            id:this.state.todos.length+1,
            todo:todoData
        }
        oldTodos.push(todoObj)

        this.setState({
            todos:oldTodos
        })
    }
    render() { 
        let todos = this.state.todos;
        return ( 
            <div className="App">
                <InputBox addTodo={this.addTodo}></InputBox>
                <TodosList todos={todos} deleteTodo={this.deleteTodo}></TodosList>
            </div>
         );
    }
}
  
export default App;