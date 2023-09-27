import React from "react";

import TodoListItem from "../todo-list-item/todo-list-item";

const TodoList = ({ todo, onDeleted, onToggleDone, onToggleEdit, changeLabel}) => {

    const elements = todo.map((item) => {
        const {id, ...itemProps } = item;

        return (
            <TodoListItem
            todostate={todo}
            changeLabel={changeLabel}
            {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
            onToggleEdit={() => onToggleEdit(id)}
            key={id}/>
        )
    })

    return (
        <ul className="todo-list">
            {elements}
        </ul>
    )
}

export default TodoList;