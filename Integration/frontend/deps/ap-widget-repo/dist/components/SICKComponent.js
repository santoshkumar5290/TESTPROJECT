'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _SICKComponentWrapper = require('../SICKComponentWrapper');

var _SICKComponentWrapper2 = _interopRequireDefault(_SICKComponentWrapper);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _SICKMuiTheme = require('../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A base React component which is shared by all SICK platform React components
 * @private
 * @abstract
 */
var SICKComponent = function (_Component) {
  (0, _inherits3.default)(SICKComponent, _Component);

  function SICKComponent() {
    (0, _classCallCheck3.default)(this, SICKComponent);
    return (0, _possibleConstructorReturn3.default)(this, (SICKComponent.__proto__ || (0, _getPrototypeOf2.default)(SICKComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SICKComponent, [{
    key: 'getChildContext',


    /** @ignore */
    value: function getChildContext() {
      return {
        muiTheme: this.muiTheme
      };
    }
  }, {
    key: 'muiTheme',


    /** @private */
    get: function get() {
      return this.context.muiTheme || (0, _getMuiTheme2.default)(this.props.config ? this.props.config.theme : _SICKMuiTheme2.default);
    }
  }], [{
    key: 'init',


    /**
     * Initializes a component returning the DOM instance it was rendered into.
     * @protected
     * @param {Element} node The {@link Element} to initialize (render) the component into.
     * @param {Object} properties The properties to be applied to the component.
     * @throws {Error} Throws Error when `init()` is called on the component directly.
     * @return {SICKComponentWrapper} The component wrapper.
     */
    value: function init(node, properties) {
      if (this.prototype.constructor === SICKComponent) {
        throw new Error('You cannot initialize the base SICK component.');
      }

      return new _SICKComponentWrapper2.default(this.prototype.constructor, node, properties);
    }

    /** @ignore */

  }]);
  return SICKComponent;
}(_react.Component);

SICKComponent.defaultProps = {
  // Default state key will be random. However, for widgets that require user settings to persist,
  // developers will need to specify the group ID for the widget.
  // Without a pre-defined and deterministic group ID, the widget will not know where to get its saved settings.
  group: _uuid2.default.v4() };
SICKComponent.childContextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
SICKComponent.contextTypes = {
  muiTheme: _propTypes2.default.object };
exports.default = SICKComponent;