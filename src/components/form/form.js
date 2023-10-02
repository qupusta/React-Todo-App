import React, { Component } from 'react'
export default class Form extends Component {
  state = {
    label: this.props.label,
  }

  handleLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onHandleSubmit = (e) => {
    e.preventDefault()
    this.props.changeLabel(this.props.label, this.state.label)
  }

  render() {
    return (
      <form onSubmit={this.onHandleSubmit}>
        <input type="text" className="edit" onChange={this.handleLabelChange} value={this.state.label} />
      </form>
    )
  }
}
