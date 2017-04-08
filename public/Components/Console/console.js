import React from 'react'
import Prompt from '../Prompt/prompt.js'
import Response from '../Response/response.js'
import './console.scss'

export default class Console extends React.Component {
  constructor() {
    super() 
    this.state = {
      historyToDisplay: [],
      promptHistory: [],
      historyIndex: 0,
      currentPrompt: {
        beforeCursor: '',
        afterCursor: ''
      }
    }
    // Bind Methods
    this.handleToggleHistory = this.handleToggleHistory.bind(this) 
    this.handleInput = this.handleInput.bind(this) 
    this.handleSubmit = this.handleSubmit.bind(this) 
    this.clearHistory = this.clearHistory.bind(this) 
    this.moveCursor = this.moveCursor.bind(this)
  }  

  componentDidMount() {
    window.addEventListener('keydown', e => {
      // Up Key
      if(e.keyCode === 38) this.handleToggleHistory('UP')
      // Down Key
      else if(e.keyCode === 40) this.handleToggleHistory('DOWN')
      // Left Key
      else if(e.keyCode === 37) this.moveCursor('LEFT')
      // Right Key
      else if(e.keyCode === 39) this.moveCursor('RIGHT')
      // Enter Key
      else if(e.keyCode === 13) this.handleSubmit()
    })
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
    let elem = document.getElementsByClassName('input')[0]
    elem.value = ''
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
    return  (
      <div className="console">
        <div className="panel">  <button onClick={() => this.clearHistory()}> Clear History </button> </div>
        <div className="consoleInterative">
          <span>Hussein's repl</span>
          <br />
        {
          (
            this.state.historyToDisplay.map((elem, idx) => {
              if(elem.type === 'prompt') {
                return <Prompt isActive={false} prompt={elem.data} key={idx}/>
              }
              else if(elem.type === 'response') {
                return <Response response={elem.data} key={idx} />
              }
            })
          )
        }
        <Prompt isActive={true} currentPrompt={this.state.currentPrompt} handleInput={this.handleInput}/>
      </div> 
      </div>
    )
  }
}