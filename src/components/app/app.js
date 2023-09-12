import React from "react";

import AppHeader from "../app-header/app-header";
import TodoList from "../todo-list/todo-list";
import Footer from "../footer/footer";


const App = () => {

    const tododata = [
        {label: 'Drink beer', completed: true, editing: false, id: 1},
        {label: 'Smoke', completed: false, editing: true, id: 2},
        {label: 'Sleep', completed: false, editing: false, id: 3},
        {label: 'Sleep2', completed: false, editing: false, id: 4},
    ]

    return (
        <section className="todoapp"> 
            <AppHeader/>
            <section className="main">
                <TodoList todos={tododata}/>
                <Footer/>
            </section>
        </section>
        
    )

}

export default App;