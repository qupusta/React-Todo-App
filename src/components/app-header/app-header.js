import React, { Component } from 'react'

export default class AppHeader extends Component {
  state = {
    label: '',
    timerSec: 0,
    timerMin: 0,
  }
  handleChangeName = (e) => {
    this.setState({ label: e.target.value })
  }
  handleChangeSec = (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '')
    this.setState({ timerSec: e.target.value })
  }
  handleChangeMin = (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '')
    this.setState({ timerMin: e.target.value })
  }
  handleSubmit = (e) => {
    if (e.code === 'Enter' && !e.target.value.match(/^[ ]+$/)) {
      const { label, timerMin, timerSec } = this.state
      if (timerMin > 59 || timerSec > 59) {
        alert('Have no time, enter a value not greater than 59')
      } else if (!label) {
        alert('Enter the description')
      } else {
        this.props.onItemAdded(label, timerSec, timerMin)
        this.setState(() => {
          return {
            label: '',
            timerMin: 0,
            timerSec: 0,
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
