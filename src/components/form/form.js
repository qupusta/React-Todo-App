import React, { useState } from 'react'
const Form = ({ label, changeLabel }) => {
  const [newLabel, setLabel] = useState(label)

  const handleLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    changeLabel(label, newLabel)
  }

  return (
    <form onSubmit={onHandleSubmit}>
      <input type="text" className="edit" onChange={handleLabelChange} value={newLabel} />
    </form>
  )
}

export default Form
