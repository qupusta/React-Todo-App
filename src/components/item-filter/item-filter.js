import React from 'react'

const Filters = ({ filter, onFilterChange }) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttonsLabel = buttons.map(({ name, label }) => {
    const isActive = filter === name
    const clazz = isActive ? 'selected' : ''
    return (
      <li key={name}>
        <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    )
  })
  return <ul className="filters">{buttonsLabel}</ul>
}

export default Filters
