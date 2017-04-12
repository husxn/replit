import React from 'react'
import Prompt from '../Prompt/prompt.js'
import Response from '../Response/response.js'
import './console.scss'

export default class Console extends React.Component {
  constructor(props) {
    super(props) 
    this.addStyling = this.addStyling.bind(this)
    this.addListeners = this.addListeners.bind(this)
  }  

  componentDidMount() {
    this.addListeners() 
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.style !== this.props.style)  this.addStyling(nextProps)
  }

  addListeners() {
    window.addEventListener('keydown', e => {
      // Up Key
      if(e.keyCode === 38) this.props.handleToggleHistory('UP')
      // Down Key
      else if(e.keyCode === 40) this.props.handleToggleHistory('DOWN')
      // Left Key
      else if(e.keyCode === 37) this.props.moveCursor('LEFT')
      // Right Key
      else if(e.keyCode === 39) this.props.moveCursor('RIGHT')
      // Enter Key
      else if(e.keyCode === 13){ 
        e.preventDefault()
        this.props.handleSubmit()
      }
    })
  }

  addStyling(props) {
    // Maybe change this to JS css file 
    let consoleElem = document.getElementsByClassName('console')[0]
    if(props.style.height) {
      consoleElem.style.height = props.style.height
    }
    if(props.style.width) {
      consoleElem.style.width = props.style.width
    }
    if(props.style.textColour) {
      document.getElementsByClassName('userInput')[0].style.color = props.style.textColour
    }
    if(props.style.backgroundColour) {
      consoleElem.style.width = props.style.width
    }
    if(props.style.fontSize) {

    }
  }


  render() {
    return  (
      <div className="console">
        <div className="panel">  <button onClick={() => this.props.clearHistory()}> Clear History </button> </div>
        <div className="consoleInterative">
          <span>Native Browser JavaScript</span>
          <br />
          <br />
        {
          (
            this.props.historyToDisplay.map((elem, idx) => {
              if(elem.type === 'prompt') {
                return <Prompt isActive={false} prompt={elem.data} key={idx}/>
              }
              else if(elem.type === 'response') {
                return <Response response={elem.data} key={idx} />
              }
            })
          )
        }
        <Prompt isActive={true} currentPrompt={this.props.currentPrompt} handleInput={this.props.handleInput}/>
      </div> 
      </div>
    )
  }
}
