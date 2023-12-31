import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import Form from '../form/form'
export default class TodoListItem extends Component {
  interval
  toggleTimer = () => {
    clearInterval(this.interval)
    this.interval = setInterval(this.props.onStartTimer, 1000)
  }
  stopTimer = () => {
    clearInterval(this.interval)
  }
  render() {
    const {
      id,
      label,
      completed,
      editing,
      createDate,
      onDeleted,
      onToggleDone,
      onToggleEdit,
      changeLabel,
      timer,
      // onStartTimer,
    } = this.props
    let classNames = ''
    if (completed) {
      classNames += 'completed'
    }

    if (editing && !completed) {
      classNames += 'editing'
    }

    if (timer.minutes < 1 && timer.seconds == 0) {
      this.stopTimer()
    }

    const dateFns = formatDistanceToNow(createDate, { includeSeconds: true, addSuffix: true })

    return (
      <li className={classNames}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onClick={onToggleDone} defaultChecked={completed} />
          <label htmlFor={id}>
            <span className="title"> {label} </span>
            <span className="description">
              <button className="icon icon-play" onClick={this.toggleTimer} />
              <button className="icon icon-pause" onClick={this.stopTimer} />
              <span style={{ marginLeft: 5 }}>{`${timer.minutes}:${timer.seconds}`}</span>
            </span>
            <span className="description">
              {'created' + ' '}
              {dateFns}
            </span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEdit} />
          <button
            className="icon icon-destroy"
            onClick={() => {
              onDeleted()
              this.stopTimer()
            }}
          />
        </div>
        <Form label={label} changeLabel={changeLabel} />
      </li>
    )
  }
}

TodoListItem.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  changeLabel: PropTypes.func,
  onToggleEdit: PropTypes.func,
  editing: PropTypes.bool,
  completed: PropTypes.bool,
  label: PropTypes.string,
  id: PropTypes.number.isRequired,
}
