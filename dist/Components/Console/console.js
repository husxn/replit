'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prompt = require('../Prompt/prompt.js');

var _prompt2 = _interopRequireDefault(_prompt);

var _response = require('../Response/response.js');

var _response2 = _interopRequireDefault(_response);

require('./console.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Console = function (_React$Component) {
  _inherits(Console, _React$Component);

  function Console(props) {
    _classCallCheck(this, Console);

    var _this = _possibleConstructorReturn(this, (Console.__proto__ || Object.getPrototypeOf(Console)).call(this, props));

    _this.addStyling = _this.addStyling.bind(_this);
    _this.addListeners = _this.addListeners.bind(_this);
    return _this;
  }

  _createClass(Console, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addListeners();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.style !== this.props.style) this.addStyling(nextProps);
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      var _this2 = this;

      window.addEventListener('keydown', function (e) {
        // Up Key
        if (e.keyCode === 38) _this2.props.handleToggleHistory('UP');
        // Down Key
        else if (e.keyCode === 40) _this2.props.handleToggleHistory('DOWN');
          // Left Key
          else if (e.keyCode === 37) _this2.props.moveCursor('LEFT');
            // Right Key
            else if (e.keyCode === 39) _this2.props.moveCursor('RIGHT');
              // Enter Key
              else if (e.keyCode === 13) {
                  e.preventDefault();
                  _this2.props.handleSubmit();
                }
      });
    }
  }, {
    key: 'addStyling',
    value: function addStyling(props) {
      // Maybe change this to JS css file 
      var consoleElem = document.getElementsByClassName('console')[0];
      if (props.style.height) {
        consoleElem.style.height = props.style.height;
      }
      if (props.style.width) {
        consoleElem.style.width = props.style.width;
      }
      if (props.style.textColour) {
        document.getElementsByClassName('userInput')[0].style.color = props.style.textColour;
      }
      if (props.style.backgroundColour) {
        consoleElem.style.width = props.style.width;
      }
      if (props.style.fontSize) {}
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'console' },
        _react2.default.createElement(
          'div',
          { className: 'panel' },
          '  ',
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return _this3.props.clearHistory();
              } },
            ' Clear History '
          ),
          ' '
        ),
        _react2.default.createElement(
          'div',
          { className: 'consoleInterative' },
          _react2.default.createElement(
            'span',
            null,
            'Native Browser JavaScript'
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          this.props.historyToDisplay.map(function (elem, idx) {
            if (elem.type === 'prompt') {
              return _react2.default.createElement(_prompt2.default, { isActive: false, prompt: elem.data, key: idx });
            } else if (elem.type === 'response') {
              return _react2.default.createElement(_response2.default, { response: elem.data, key: idx });
            }
          }),
          _react2.default.createElement(_prompt2.default, { isActive: true, currentPrompt: this.props.currentPrompt, handleInput: this.props.handleInput })
        )
      );
    }
  }]);

  return Console;
}(_react2.default.Component);

exports.default = Console;