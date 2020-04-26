import React from 'react'

export class FilterForm extends React.Component {
  render() {
    return (
      <div className="select">
        <select>
          <option value="" disabled selected>
            Sort by
          </option>
          <option>Created</option>
          <option>Completed</option>
          <option>Processing</option>
          <option>Completed</option>
        </select>
      </div>
    )
  }
}
