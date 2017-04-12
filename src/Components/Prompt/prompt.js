import React from 'react'
import './prompt.scss'

export default class Prompt extends React.Component {
  constructor(props) {
    super(props) 
  }



  componentDidMount() {
    document.body.addEventListener('click', () => {
      let textArea = document.getElementById('replTextArea')
      textArea.focus()
    })
  }

  render () {
    return (
      <div className="prompt">
        {
          this.props.isActive === true ? 
          <div className="promptLine">
            {/* Prompt Icon */ }
            <span className="promptIcon"> > </span>
            {/* Prompt Text Before Cursor*/}
            <span className="userInput">{this.props.currentPrompt.beforeCursor}</span>
            {/* Cursor */}
            <span className="cursor" id="cursor"/>
            {/* Prompt Text After Cursor*/}
            <span className="userInput">{this.props.currentPrompt.afterCursor}</span>
            {/* Hidden Text Area For Input*/}
            <textarea className="input" id="replTextArea" onChange={this.props.handleInput} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
          </div>  
          : 
          <div className="promptLine">
            <span className="promptIcon history"> > </span>
            {/* Full Prompt From History*/}
            <span className="userInput history">{this.props.prompt}</span>
          </div>
        }
      </div>
    )
  }
}