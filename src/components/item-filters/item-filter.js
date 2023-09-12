import React from "react";

const Filters = () => {
    return (
        <ul className="filters">
            <button className="selected">All</button>
            <button>Active</button>
            <button>Completed</button>
        </ul>
    )
}

export default Filters;