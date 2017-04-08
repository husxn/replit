import React from 'react'
import './response.scss'

export default class Response extends React.Component {
  constructor() {
    super() 
  }

  render () {
    return (
      <div className="response">
          {/* Response Icon */}
          <span className="responseIcon"> => </span>
          {/* Response Data */}
          <span className="responseData">{this.props.response}</span>
      </div>  
    )
  }
}