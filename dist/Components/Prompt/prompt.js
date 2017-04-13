'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jsStylesheet = require('js-stylesheet');

var _jsStylesheet2 = _interopRequireDefault(_jsStylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './prompt.scss'

var Prompt = function (_React$Component) {
  _inherits(Prompt, _React$Component);

  function Prompt(props) {
    _classCallCheck(this, Prompt);

    return _possibleConstructorReturn(this, (Prompt.__proto__ || Object.getPrototypeOf(Prompt)).call(this, props));
  }

  _createClass(Prompt, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _jsStylesheet2.default)(require('../Style/style.js'));
      document.body.addEventListener('click', function () {
        var textArea = document.getElementById('replTextArea');
        textArea.focus();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'prompt' },
        this.props.isActive === true ? _react2.default.createElement(
          'div',
          { className: 'promptLine' },
          _react2.default.createElement(
            'span',
            { className: 'promptIcon' },
            ' > '
          ),
          _react2.default.createElement(
            'span',
            { className: 'userInput' },
            this.props.currentPrompt.beforeCursor
          ),
          _react2.default.createElement('span', { className: 'cursor', id: 'cursor' }),
          _react2.default.createElement(
            'span',
            { className: 'userInput' },
            this.props.currentPrompt.afterCursor
          ),
          _react2.default.createElement('textarea', { className: 'input', id: 'replTextArea', onChange: this.props.handleInput, autoComplete: 'off', autoCorrect: 'off', autoCapitalize: 'off', spellCheck: 'false' })
        ) : _react2.default.createElement(
          'div',
          { className: 'promptLine' },
          _react2.default.createElement(
            'span',
            { className: 'promptIcon history' },
            ' > '
          ),
          _react2.default.createElement(
            'span',
            { className: 'userInput history' },
            this.props.prompt
          )
        )
      );
    }
  }]);

  return Prompt;
}(_react2.default.Component);

exports.default = Prompt;