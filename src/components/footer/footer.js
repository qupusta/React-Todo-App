import React from "react";

import Filters from "../item-filters/item-filter";

const Footer = () => {
    return (
        <footer className="footer">
            <span className="todo-count">99 items left</span>
            <Filters/>
            <button className="clear-completed">
                Clear completed
            </button>
        </footer>
    )
}

export default Footer;