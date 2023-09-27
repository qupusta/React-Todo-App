import React from "react";

import Filters from "../item-filters/item-filter";

const Footer = ({todosLeft, filter, onFilterChange, onClearCompleted}) => {
    return (
        <footer className="footer">
            <span className="todo-count">{todosLeft} items left</span>
            <Filters filter={filter}
                    onFilterChange={onFilterChange}/>
            <button className="clear-completed"
                    onClick={onClearCompleted}>
                Clear completed
            </button>
        </footer>
    )
}

export default Footer;