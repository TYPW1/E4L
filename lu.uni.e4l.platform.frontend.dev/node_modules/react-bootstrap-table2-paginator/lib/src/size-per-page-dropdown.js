'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sizePerPageOption = require('./size-per-page-option');

var _sizePerPageOption2 = _interopRequireDefault(_sizePerPageOption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sizePerPageDefaultClass = 'react-bs-table-sizePerPage-dropdown';

var SizePerPageDropDown = function SizePerPageDropDown(props) {
  var open = props.open,
      hidden = props.hidden,
      onClick = props.onClick,
      onBlur = props.onBlur,
      options = props.options,
      className = props.className,
      variation = props.variation,
      btnContextual = props.btnContextual,
      currSizePerPage = props.currSizePerPage,
      onSizePerPageChange = props.onSizePerPageChange;


  var dropDownStyle = { visibility: hidden ? 'hidden' : 'visible' };
  var dropdownClasses = (0, _classnames2.default)(open ? 'open show' : '', sizePerPageDefaultClass, variation, className);

  return _react2.default.createElement(
    'span',
    {
      style: dropDownStyle,
      className: dropdownClasses
    },
    _react2.default.createElement(
      'button',
      {
        id: 'pageDropDown',
        className: 'btn ' + btnContextual + ' dropdown-toggle',
        'data-toggle': 'dropdown',
        'aria-expanded': open,
        onClick: onClick,
        onBlur: onBlur
      },
      currSizePerPage,
      _react2.default.createElement(
        'span',
        null,
        ' ',
        _react2.default.createElement('span', { className: 'caret' })
      )
    ),
    _react2.default.createElement(
      'ul',
      { className: 'dropdown-menu', role: 'menu', 'aria-labelledby': 'pageDropDown' },
      options.map(function (option) {
        return _react2.default.createElement(_sizePerPageOption2.default, _extends({}, option, {
          key: option.text,
          onSizePerPageChange: onSizePerPageChange
        }));
      })
    )
  );
};

SizePerPageDropDown.propTypes = {
  currSizePerPage: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.array.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  onBlur: _propTypes2.default.func.isRequired,
  onSizePerPageChange: _propTypes2.default.func.isRequired,
  open: _propTypes2.default.bool,
  hidden: _propTypes2.default.bool,
  btnContextual: _propTypes2.default.string,
  variation: _propTypes2.default.oneOf(['dropdown', 'dropup']),
  className: _propTypes2.default.string
};
SizePerPageDropDown.defaultProps = {
  open: false,
  hidden: false,
  btnContextual: 'btn-default btn-secondary',
  variation: 'dropdown',
  className: ''
};

exports.default = SizePerPageDropDown;