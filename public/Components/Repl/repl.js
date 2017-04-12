import React from 'react'
import Console from '../Console/console.js'

export default class Repl extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      historyToDisplay: [],
      promptHistory: [],
      historyIndex: 0,
      currentPrompt: {
        beforeCursor: '',
        afterCursor: ''
      },
      style:{}
    }
    // Bind Methods
    this.handleToggleHistory = this.handleToggleHistory.bind(this) 
    this.handleInput = this.handleInput.bind(this) 
    this.handleSubmit = this.handleSubmit.bind(this) 
    this.clearHistory = this.clearHistory.bind(this) 
    this.moveCursor = this.moveCursor.bind(this)
    this.setUpStyles = this.setUpStyles.bind(this)
    console.log('props: ', this.props)
  }

  componentDidMount() {
    this.setUpStyles()
  }

  setUpStyles() {
    let newStyle = {}
    if(this.props.height) {
      newStyle.height = this.props.height
    }
    if(this.props.width) {
      newStyle.width = this.props.width
    }
    if(this.props.textColour) {
      newStyle.textColour = this.props.textColour
    }
    if(this.props.backgroundColour) {
      newStyle.backgroundColour = this.props.backgroundColour
    }
    if(this.props.fontSize) {
      newStyle.props.fontSize = this.props.fontSize
    }
    if(Object.keys(newStyle).length) {
      this.setState({ style: newStyle })
    }

  }


  evaluateInput(str) {
    let evaluatedStr; 
    try {
      evaluatedStr = eval(str)
      /* Need to take care of strings that are objects e.g "{a: 'asfasf'}" */
      if(typeof evaluatedStr === 'object') return JSON.stringify(evaluatedStr)
      evaluatedStr = evaluatedStr === undefined ? 'undefined' : evaluatedStr
    }
    catch(err) {
      evaluatedStr = err.toString()
    }
    return evaluatedStr
  }


  handleSubmit() {
    // Reset Text Area
    let textArea = document.getElementById('replTextArea')
    textArea.value = ''
    // Get final Prompt
    let prompt = this.state.currentPrompt.beforeCursor + this.state.currentPrompt.afterCursor
    // Evaluate the Prompt
    let response = this.evaluateInput(prompt) 
    let promptHistoryItem = {
      type: 'prompt', 
      data: prompt
    }
    let responseHistoryItem = {
      type: 'response', 
      data: response
    }
    let newHistory = this.state.historyToDisplay.concat([promptHistoryItem, responseHistoryItem])
    let newPromptHistory = this.state.promptHistory.concat(promptHistoryItem)
    this.setState({ 
      historyToDisplay: newHistory, 
      historyIndex: newPromptHistory.length, 
      promptHistory: newPromptHistory,
      currentPrompt: {
        beforeCursor: '',
        afterCursor: ''
      }
    })
  }


  handleToggleHistory(str) {
    let len = this.state.promptHistory.length
    // Do not take action if promptHistory is empty
    if(!len) return
    let num = this.state.historyIndex 
    if(str === 'UP') {
      if(num < 1) num = 0
      else num -= 1
    } 
    else if(str === 'DOWN') {
      if(num >= len - 1) num = len - 1
      else num += 1
    }
    // Set textarea hidden text to new prompt data
    let textArea = document.getElementById('replTextArea') 
    textArea.value = this.state.promptHistory[num].data
    textArea.selectionStart = textArea.value.length
    // Set new state with new prompt from history
    this.setState({
      historyIndex: num, 
        currentPrompt: {
        beforeCursor: this.state.promptHistory[num].data, 
        afterCursor: ''
      }
    })
  }

  /* Needed because window listener is run before prompt calls handleInput resulting in cursor
     being off by one */
  moveCursor(direction) {
    let textArea = document.getElementById('replTextArea'), idx = textArea.selectionStart
    if(direction === 'RIGHT') {
      idx = idx > textArea.value.length ? idx : idx + 1
    }
    else if(direction === 'LEFT') {
      idx = idx < 1 ? 0 : idx - 1 
    }
    this.handleInput(idx)
  }

  handleInput(idx) {
    // Get current hidden string in text area
    let textArea = document.getElementById('replTextArea'), content = textArea.value
    // onChange passes the this context as 1st arg. Need to ensure idx is a num and not obj
    let cursorIdx = Number.isInteger(idx) ? idx : textArea.selectionStart 
    // Represent strings for before and after teh cursor
    let leftStr = content.substring(0, cursorIdx), rightStr = content.substring(cursorIdx, content.length)
    let newState = Object.assign({}, this.state.currentPrompt, {beforeCursor: leftStr, afterCursor: rightStr})
    // Set new state to represent change in textarea
    this.setState({currentPrompt: newState})
  }


  clearHistory() {
    console.log('psst incongnito')
    this.setState({historyToDisplay: []})
  }

  render() {
    return <Console 
              clearHistory={this.clearHistory} 
              currentPrompt={this.state.currentPrompt} 
              handleInput={this.handleInput} 
              handleSubmit={this.handleSubmit}
              style={this.state.style}
              historyToDisplay={this.state.historyToDisplay}
              handleToggleHistory={this.handleToggleHistory} 
              moveCursor={this.moveCursor}
           />
  }
}
