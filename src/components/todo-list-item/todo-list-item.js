import React, { Component } from "react";

export default class TodoListItem extends Component {

    constructor() {
        super();

        this.state = {
            completed: false,
            edited: false
        }

        this.onToggleClick = () => {
            this.setState(({completed, active}) => {
                return {
                    completed: !completed,
                    active: !active
                }
            })
        }

        this.onToggleEdit = () => {
            this.setState(({edited}) => {                
                return {
                    edited: !edited
                }
            })
        }
    }

    render() {
        const { id, label, onDeleted } = this.props;
        const { completed, edited } = this.state;
        


        let classNames = '';
        if (completed) {
            classNames += 'completed'
        }

        if (edited) {
            classNames += 'editing'
        }

        return (
            <li className={classNames}>
                <div className="view">
                    <input id={id} className="toggle" type="checkbox"
                        onClick={this.onToggleClick} />
                    <label htmlFor={id}>
                        <span className="description"> {label} </span>
                        <span className="created"> created </span>
                    </label>
                    <button className="icon icon-edit"
                    onClick={this.onToggleEdit}
                    ></button>
                    <button className="icon icon-destroy"
                    onClick={onDeleted}></button>
                </div>
                <form>
                    <input type="text" className="edit"/>
                </form>
            </li>

        )
    }
}