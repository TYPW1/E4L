'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wrapper = require('./src/wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    wrapperFactory: _wrapper2.default,
    options: options
  };
};