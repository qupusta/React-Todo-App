import React, { useState } from 'react'

const AppHeader = ({ onItemAdded }) => {
  const [label, setLabel] = useState('')
  const [timer, setTimer] = useState(0)
  const handleChangeName = (e) => {
    setLabel(e.target.value)
  }
  const handleChangeSec = (e) => {
    e.target.value = +e.target.value.replace(/[^\d]/g, '')
    if (e.target.value > 59) {
      alert('The number you entered is too high. Use numbers no more than 59')
      return
    } else {
      setTimeout(() => {
        setTimer(timer + Number(e.target.value))
      }, 800)
    }
  }
  const handleChangeMin = (e) => {
    e.target.value = +e.target.value.replace(/[^\d]/g, '')
    if (e.target.value > 59) {
      alert('The number you entered is too high. Use numbers no more than 59')
      return
    } else {
      setTimeout(() => {
        setTimer(timer + Number(e.target.value) * 60)
      }, 800)
    }
  }
  const handleSubmit = (e) => {
    if (e.code === 'Enter' && !e.target.value.match(/^[ ]+$/)) {
      if (!label) {
        alert('Enter the description')
      } else {
        onItemAdded(label, timer)
        setLabel('')
      }
      setTimer(0)
    }
  }
  return (
    <header>
      <h1>todos</h1>
      <form className="new-todo-form" onKeyDown={handleSubmit}>
        <input value={label} onChange={handleChangeName} className="new-todo" placeholder="What needs to be done?" />
        <input onChange={handleChangeMin} className="new-todo-form__timer" placeholder="Min" />
        <input onChange={handleChangeSec} className="new-todo-form__timer" placeholder="Sec" />
      </form>
    </header>
  )
}

export default AppHeader
