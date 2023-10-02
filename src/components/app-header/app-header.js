import React from 'react'

function AppHeader({ onItemAdded }) {
  return (
    <header>
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={(e) => {
          if (e.code === 'Enter' && !e.target.value.match(/^[ ]+$/)) {
            onItemAdded(e.target.value)
            e.target.value = ''
          }
        }}
      />
    </header>
  )
}

export default AppHeader
