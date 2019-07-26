'use strict';

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SICKComponent2 = require('./components/SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (0, _jsx3.default)('div', {});

var Test = function (_SICKComponent) {
  (0, _inherits3.default)(Test, _SICKComponent);

  function Test() {
    (0, _classCallCheck3.default)(this, Test);
    return (0, _possibleConstructorReturn3.default)(this, (Test.__proto__ || (0, _getPrototypeOf2.default)(Test)).apply(this, arguments));
  }

  (0, _createClass3.default)(Test, [{
    key: 'render',
    value: function render() {
      return _ref;
    }
  }]);
  return Test;
}(_SICKComponent3.default);

/** @test {(Wrapper) SICKComponentWrapper} */


describe('(Wrapper) SICKComponentWrapper', function () {
  it('Should create a DOM Element.', function () {
    var wrappedComponent = Test.init(document.createElement('div'));

    expect(wrappedComponent.node).to.be.an.instanceOf(Element);
  });
});