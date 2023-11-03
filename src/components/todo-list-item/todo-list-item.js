import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import Form from '../form/form'
const TodoListItem = ({
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
  onStartTimer,
}) => {
  const [thisTimer, setTimer] = useState(timer.seconds)
  const [run, setRun] = useState(false)
  const startTimer = () => {
    if (!run && thisTimer >= 1) {
      setTimer(thisTimer - 1)
    } else {
      setRun(false)
    }
  }

  useEffect(() => {
    let interval
    if (run) {
      interval = setInterval(startTimer, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  })

  useEffect(() => onStartTimer(id), [id, thisTimer, run])

  let classNames = ''
  if (completed) {
    classNames += 'completed'
  }

  if (editing && !completed) {
    classNames += 'editing'
  }

  let showMinutes = Math.floor(thisTimer / 60)
  let showSeconds = thisTimer % 60

  const dateFns = formatDistanceToNow(createDate, { includeSeconds: true, addSuffix: true })

  return (
    <li className={classNames}>
      <div className="view">
        <input
          id={id}
          className="toggle"
          type="checkbox"
          onClick={() => {
            onToggleDone(id)
            setRun(false)
          }}
          defaultChecked={completed}
        />
        <label htmlFor={id}>
          <span className="title"> {label} </span>
          <span className="description">
            <button className="icon icon-play" onClick={() => setRun(true)} />
            <button className="icon icon-pause" onClick={() => setRun(false)} />
            <span style={{ marginLeft: 5 }}>{`${showMinutes}:${showSeconds}`}</span>
          </span>
          <span className="description">
            {'created' + ' '}
            {dateFns}
          </span>
        </label>
        <button className="icon icon-edit" onClick={() => onToggleEdit(id)} />
        <button
          className="icon icon-destroy"
          onClick={() => {
            onDeleted(id)
            setRun(false)
          }}
        />
      </div>
      <Form label={label} changeLabel={changeLabel} />
    </li>
  )
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

export default TodoListItem
