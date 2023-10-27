import React, { Component } from 'react'

export default class AppHeader extends Component {
  state = {
    label: '',
    timer: null,
  }
  min = 0
  sec = 0

  handleChangeName = (e) => {
    this.setState({ label: e.target.value })
  }
  handleChangeSec = (e) => {
    e.target.value = +e.target.value.replace(/[^\d]/g, '')
    if (e.target.value > 59) {
      alert('The number you entered is too high. Use numbers no more than 59')
      return
    } else {
      this.sec = e.target.value
      this.setState({ timer: Number(this.min) * 60 + Number(this.sec) })
    }
  }
  handleChangeMin = (e) => {
    e.target.value = +e.target.value.replace(/[^\d]/g, '')
    if (e.target.value > 59) {
      alert('The number you entered is too high. Use numbers no more than 59')
      return
    } else {
      this.min = e.target.value
      this.setState({ timer: Number(this.min) * 60 + Number(this.sec) })
    }
  }
  handleSubmit = (e) => {
    if (e.code === 'Enter' && !e.target.value.match(/^[ ]+$/)) {
      const { label, timer } = this.state
      if (!label) {
        alert('Enter the description')
      } else {
        this.props.onItemAdded(label, timer)
        this.setState(() => {
          return {
            label: '',
          }
        })
      }
    }
  }
  render() {
    return (
      <header>
        <h1>todos</h1>
        <form className="new-todo-form" onKeyDown={this.handleSubmit}>
          <input
            value={this.state.label}
            onChange={this.handleChangeName}
            className="new-todo"
            placeholder="What needs to be done?"
          />
          <input onChange={this.handleChangeMin} className="new-todo-form__timer" placeholder="Min" />
          <input onChange={this.handleChangeSec} className="new-todo-form__timer" placeholder="Sec" />
        </form>
      </header>
    )
  }
}
