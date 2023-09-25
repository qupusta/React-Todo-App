import React, { Component } from "react";

import AppHeader from "../app-header/app-header";
import TodoList from "../todo-list/todo-list";
import Footer from "../footer/footer";


export default class App extends Component {

    maxId = 100;

    state = {
        tododata: [
            {label: 'Drink beer', active: true, completed: true, editing: false, id: 1},
            {label: 'Smoke', active: true, completed: false, editing: true, id: 2},
            {label: 'Sleep', active: true, completed: false, editing: false, id: 3},
            {label: 'Sleep2', active: true, completed: false, editing: false, id: 4},
        ]
    }

    deleteItem = (id) => {
        this.setState(({tododata}) => {
            const idx = tododata.findIndex((el) => el.id === id);

            const newArray = [
                ...tododata.slice(0, idx), ...tododata.slice(idx + 1)
            ]
            
            return {
                tododata: newArray
            }
        });
    }

    addItem = (text) => {
        const newItem = { 
            label: text,
            completed: false,
            editing: false,
            id: this.maxId++
        }

        this.setState(({ tododata }) => {
            const newArr = [ 
                ...tododata,
                newItem
            ];

            return {
                tododata: newArr
            }
        })
    }

    render() {
        return (
            <section className="todoapp"> 
                <AppHeader onItemAdded={this.addItem}/>
                <section className="main">
                    <TodoList todos={this.state.tododata}
                    onDeleted={ this.deleteItem }/>
                    <Footer/>
                </section>
            </section>
            
        )
    }
}