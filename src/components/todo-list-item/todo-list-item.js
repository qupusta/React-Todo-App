import React, { Component } from "react";
import { formatDistanceToNow } from 'date-fns';

import Form from "../form/form";

export default class TodoListItem extends Component {
    render() {
        const {
             id, label, completed, editing, createDate,
             onDeleted, onToggleDone, onToggleEdit,
             changeLabel
            } = this.props;

        let classNames = '';

        if (completed) {
            classNames += 'completed'
        }

        if (editing && !completed) {
            classNames += 'editing'
        }
        
        const dateFns = formatDistanceToNow(
            createDate,
            {includeSeconds: true, addSuffix: true},
        )

        return (
            
            <li className={classNames}>
                <div className="view">
                    <input id={id} className="toggle" type="checkbox"
                        onClick={onToggleDone}
                        defaultChecked={completed}/>
                    <label htmlFor={id}>
                        <span className="description"> {label} </span>
                        <span className="created"> created {dateFns}</span>
                    </label>
                    <button className="icon icon-edit"
                    onClick={onToggleEdit}
                    ></button>
                    <button className="icon icon-destroy"
                    onClick={onDeleted}></button>
                </div>
                <Form label={label} changeLabel={changeLabel} />
            </li>

        )
    }
}