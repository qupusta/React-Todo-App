/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'

import AppHeader from '../app-header/app-header'
import TodoList from '../todo-list/todo-list'
import Footer from '../footer/footer'

const App = () => {
  const [tododata, setData] = useState([])
  const [term, setTerm] = useState('')
  const [filter, setFilter] = useState('all')

  const onStartTimer = useCallback((id) => {
    setData((tododata) => {
      const idx = tododata.findIndex((el) => el.id === id)
      const oldTimer = tododata[idx].timer
      let newSeconds = oldTimer.seconds
      let newTimer = { ...oldTimer, seconds: newSeconds - 1 }
      const newItem = { ...tododata[idx], timer: newTimer }
      const newArray = [...tododata.slice(0, idx), newItem, ...tododata.slice(idx + 1)]
      return newArray
    })
  }, [])

  const createTodoItem = (label, timer = 0) => {
    const task = {
      label,
      timer,
      editing: false,
      id: Math.round(Math.random() * 100),
      completed: false,
      createDate: new Date(),
    }
    return task
  }

  const deleteItem = (id) => {
    const idx = tododata.findIndex((el) => el.id === id)

    const newArray = [...tododata.slice(0, idx), ...tododata.slice(idx + 1)]
    setData(newArray)
  }

  const addItem = (text, sec = 0) => {
    if (text) {
      const timer = { seconds: sec }
      const newItem = createTodoItem(text, timer)

      const newArray = [...tododata, newItem]
      setData(newArray)
    }
  }

  const onClearCompleted = () => {
    const newArr = []
    tododata.forEach((el) => {
      if (!el.completed) {
        newArr.push(el)
      }
    })
    setData(newArr)
  }

  const onToggleDone = (id) => {
    setData((tododata) => {
      const idx = tododata.findIndex((el) => el.id === id)
      const oldItem = tododata[idx]
      const newItem = { ...oldItem, completed: !oldItem.completed }

      const newArray = [...tododata.slice(0, idx), newItem, ...tododata.slice(idx + 1)]

      return newArray
    })
  }

  const onToggleEdit = (id) => {
    setData((tododata) => {
      const idx = tododata.findIndex((el) => el.id === id)
      const oldItem = tododata[idx]
      const newItem = { ...oldItem, editing: !oldItem.editing }

      const newArray = [...tododata.slice(0, idx), newItem, ...tododata.slice(idx + 1)]

      return newArray
    })
  }

  const changeLabel = (oldLabel, newLabel) => {
    setData((tododata) => {
      const idx = tododata.findIndex((el) => el.label === oldLabel)
      const oldItem = tododata[idx]
      const newItem = { ...oldItem, label: newLabel, editing: !oldItem.editing }

      const newArray = [...tododata.slice(0, idx), newItem, ...tododata.slice(idx + 1)]

      return newArray
    })
  }

  function search(items, term) {
    if (term.length === 0) {
      return items
    }
    return items.filter((item) => item.label.indexOf(term) > -1)
  }

  function filterTodo(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.completed)
      case 'completed':
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }

  const visibleItems = filterTodo(search(tododata, term), filter)
  const todoCount = tododata.filter((el) => !el.completed).length
  return (
    <div className="todoapp">
      <AppHeader onItemAdded={addItem} />
      <section className="main">
        <TodoList
          onStartTimer={onStartTimer}
          todo={visibleItems}
          changeLabel={changeLabel}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
        />
      </section>
      <Footer todosLeft={todoCount} filter={filter} onFilterChange={setFilter} onClearCompleted={onClearCompleted} />
    </div>
  )
}

export default App
