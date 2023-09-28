import React from "react";

const AppHeader = ({ onItemAdded }) => {
    return (
        <header>
            <h1>todos</h1>
            <input
            className="new-todo" placeholder="What needs to be done?" autoFocus
            onKeyDown={(e) => {
                if (e.code === 'Enter' && 
                    !e.target.value.match(/^[ ]+$/)) {
                    onItemAdded(e.target.value)
                    e.target.value = '';
                }
            }}/>
        </header>
    )
}

export default AppHeader;