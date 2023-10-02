import React, { Component } from 'react'

import AppHeader from '../app-header/app-header'
import TodoList from '../todo-list/todo-list'
import Footer from '../footer/footer'

export default class App extends Component {
  maxId = 100

  state = {
    tododata: [],
    term: '',
    filter: '',
  }

  deleteItem = (id) => {
    this.setState(({ tododata }) => {
      const idx = tododata.findIndex((el) => el.id === id)

      const newArray = [...tododata.slice(0, idx), ...tododata.slice(idx + 1)]

      return {
        tododata: newArray,
      }
    })
  }

  addItem = (text) => {
    if (text.length !== 0) {
      const newItem = this.createTodoItem(text)

      this.setState(({ tododata }) => {
        const newArr = [...tododata, newItem]

        return {
          tododata: newArr,
        }
      })
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  onClearCompleted = () => {
    const idxArr = this.state.tododata.filter((el) => el.completed)
    idxArr.forEach((el) => {
      this.deleteItem(el.id)
    })
  }

  onToggleDone = (id) => {
    this.setState(({ tododata }) => {
      const idx = tododata.findIndex((el) => el.id === id)
      const oldItem = tododata[idx]
      const newItem = { ...oldItem, completed: !oldItem.completed }

      const newArray = [...tododata.slice(0, idx), newItem, ...tododata.slice(idx + 1)]

      return {
        tododata: newArray,
      }
    })
  }

  onToggleEdit = (id) => {
    this.setState(({ tododata }) => {
      const idx = tododata.findIndex((el) => el.id === id)
      const oldItem = tododata[idx]
      const newItem = { ...oldItem, editing: !oldItem.editing }

      const newArray = [...tododata.slice(0, idx), newItem, ...tododata.slice(idx + 1)]

      return {
        tododata: newArray,
      }
    })
  }

  changeLabel = (oldLabel, newLabel) => {
    this.setState(({ tododata }) => {
      const idx = tododata.findIndex((el) => el.label === oldLabel)
      const oldItem = tododata[idx]
      const newItem = { ...oldItem, label: newLabel, editing: !oldItem.editing }

      const newArray = [...tododata.slice(0, idx), newItem, ...tododata.slice(idx + 1)]

      return {
        tododata: newArray,
      }
    })
  }

  search(items, term) {
    if (term.length === 0) {
      return items
    }
    return items.filter((item) => item.label.indexOf(term) > -1)
  }

  createTodoItem(label) {
    return {
      label,
      editing: false,
      id: this.maxId++,
      completed: false,
      createDate: new Date(),
    }
  }

  filter(items, filter) {
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

  render() {
    const { tododata, term, filter } = this.state
    const visibleItems = this.filter(this.search(tododata, term), filter)
    const todoCount = this.state.tododata.filter((el) => !el.completed).length

    return (
      <div className="todoapp">
        <AppHeader onItemAdded={this.addItem} />
        <section className="main">
          <TodoList
            todo={visibleItems}
            changeLabel={this.changeLabel}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
          />
        </section>
        <Footer
          todosLeft={todoCount}
          filter={filter}
          onFilterChange={this.onFilterChange}
          onClearCompleted={this.onClearCompleted}
        />
      </div>
    )
  }
}
