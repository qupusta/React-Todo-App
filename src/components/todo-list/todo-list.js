import React from 'react'
import PropTypes from 'prop-types'

import TodoListItem from '../todo-list-item/todo-list-item'

function TodoList({ todo, onDeleted, onToggleDone, onToggleEdit, changeLabel, onStartTimer }) {
  const elements = todo.map((item) => {
    const { id, ...itemProps } = item
    return (
      <TodoListItem
        todostate={todo}
        id={id}
        changeLabel={changeLabel}
        {...itemProps}
        onStartTimer={() => onStartTimer(id)}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEdit={() => onToggleEdit(id)}
        key={id}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TodoList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  changeLabel: () => {},
}

TodoList.propsTypes = {
  todo: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TodoList
