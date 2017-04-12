'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _repl = require('./Components/Repl/repl.js');

var _repl2 = _interopRequireDefault(_repl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = document.getElementById('root'); /* IMPORTS */


_reactDom2.default.render(_react2.default.createElement(_repl2.default, null), root);