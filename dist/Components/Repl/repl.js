'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _console = require('../Console/console.js');

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Repl = function (_React$Component) {
  _inherits(Repl, _React$Component);

  function Repl(props) {
    _classCallCheck(this, Repl);

    var _this = _possibleConstructorReturn(this, (Repl.__proto__ || Object.getPrototypeOf(Repl)).call(this, props));

    _this.state = {
      historyToDisplay: [],
      promptHistory: [],
      historyIndex: 0,
      currentPrompt: {
        beforeCursor: '',
        afterCursor: ''
      },
      style: {}
    };
    // Bind Methods
    _this.handleToggleHistory = _this.handleToggleHistory.bind(_this);
    _this.handleInput = _this.handleInput.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.clearHistory = _this.clearHistory.bind(_this);
    _this.moveCursor = _this.moveCursor.bind(_this);
    _this.setUpStyles = _this.setUpStyles.bind(_this);
    return _this;
  }

  _createClass(Repl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setUpStyles();
    }
  }, {
    key: 'setUpStyles',
    value: function setUpStyles() {
      var newStyle = {};
      if (this.props.height) {
        newStyle.height = this.props.height;
      }
      if (this.props.width) {
        newStyle.width = this.props.width;
      }
      if (this.props.textColour) {
        newStyle.textColour = this.props.textColour;
      }
      if (this.props.backgroundColour) {
        newStyle.backgroundColour = this.props.backgroundColour;
      }
      if (this.props.fontSize) {
        newStyle.props.fontSize = this.props.fontSize;
      }
      if (Object.keys(newStyle).length) {
        this.setState({ style: newStyle });
      }
    }
  }, {
    key: 'evaluateInput',
    value: function evaluateInput(str) {
      var evaluatedStr = void 0;
      try {
        evaluatedStr = eval(str);
        /* Need to take care of strings that are objects e.g "{a: 'asfasf'}" */
        if ((typeof evaluatedStr === 'undefined' ? 'undefined' : _typeof(evaluatedStr)) === 'object') return JSON.stringify(evaluatedStr);
        evaluatedStr = evaluatedStr === undefined ? 'undefined' : evaluatedStr;
      } catch (err) {
        evaluatedStr = err.toString();
      }
      return evaluatedStr;
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit() {
      // Reset Text Area
      var textArea = document.getElementById('replTextArea');
      textArea.value = '';
      // Get final Prompt
      var prompt = this.state.currentPrompt.beforeCursor + this.state.currentPrompt.afterCursor;
      // Evaluate the Prompt
      var response = this.evaluateInput(prompt);
      var promptHistoryItem = {
        type: 'prompt',
        data: prompt
      };
      var responseHistoryItem = {
        type: 'response',
        data: response
      };
      var newHistory = this.state.historyToDisplay.concat([promptHistoryItem, responseHistoryItem]);
      var newPromptHistory = this.state.promptHistory.concat(promptHistoryItem);
      this.setState({
        historyToDisplay: newHistory,
        historyIndex: newPromptHistory.length,
        promptHistory: newPromptHistory,
        currentPrompt: {
          beforeCursor: '',
          afterCursor: ''
        }
      });
    }
  }, {
    key: 'handleToggleHistory',
    value: function handleToggleHistory(str) {
      var len = this.state.promptHistory.length;
      // Do not take action if promptHistory is empty
      if (!len) return;
      var num = this.state.historyIndex;
      if (str === 'UP') {
        if (num < 1) num = 0;else num -= 1;
      } else if (str === 'DOWN') {
        if (num >= len - 1) num = len - 1;else num += 1;
      }
      // Set textarea hidden text to new prompt data
      var textArea = document.getElementById('replTextArea');
      textArea.value = this.state.promptHistory[num].data;
      textArea.selectionStart = textArea.value.length;
      // Set new state with new prompt from history
      this.setState({
        historyIndex: num,
        currentPrompt: {
          beforeCursor: this.state.promptHistory[num].data,
          afterCursor: ''
        }
      });
    }

    /* Needed because window listener is run before prompt calls handleInput resulting in cursor
       being off by one */

  }, {
    key: 'moveCursor',
    value: function moveCursor(direction) {
      var textArea = document.getElementById('replTextArea'),
          idx = textArea.selectionStart;
      if (direction === 'RIGHT') {
        idx = idx > textArea.value.length ? idx : idx + 1;
      } else if (direction === 'LEFT') {
        idx = idx < 1 ? 0 : idx - 1;
      }
      this.handleInput(idx);
    }
  }, {
    key: 'handleInput',
    value: function handleInput(idx) {
      // Get current hidden string in text area
      var textArea = document.getElementById('replTextArea'),
          content = textArea.value;
      // onChange passes the this context as 1st arg. Need to ensure idx is a num and not obj
      var cursorIdx = Number.isInteger(idx) ? idx : textArea.selectionStart;
      // Represent strings for before and after teh cursor
      var leftStr = content.substring(0, cursorIdx),
          rightStr = content.substring(cursorIdx, content.length);
      var newState = Object.assign({}, this.state.currentPrompt, { beforeCursor: leftStr, afterCursor: rightStr });
      // Set new state to represent change in textarea
      this.setState({ currentPrompt: newState });
    }
  }, {
    key: 'clearHistory',
    value: function clearHistory() {
      console.log('psst incongnito');
      this.setState({ historyToDisplay: [] });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_console2.default, {
        clearHistory: this.clearHistory,
        currentPrompt: this.state.currentPrompt,
        handleInput: this.handleInput,
        handleSubmit: this.handleSubmit,
        style: this.state.style,
        historyToDisplay: this.state.historyToDisplay,
        handleToggleHistory: this.handleToggleHistory,
        moveCursor: this.moveCursor
      });
    }
  }]);

  return Repl;
}(_react2.default.Component);

exports.default = Repl;