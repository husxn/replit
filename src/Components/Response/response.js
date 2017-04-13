import React from 'react'
import jss from 'js-stylesheet'
// import './response.scss'

export default class Response extends React.Component {
  constructor(props) {
    super(props) 
  }
  
  componentDidMount() {
    jss(require('../Style/style.js'))
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