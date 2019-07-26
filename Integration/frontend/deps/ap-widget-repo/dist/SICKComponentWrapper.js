'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wraps SICKComponent instances to provide high level API interfaces for non-React appliances.
 * @private
 */
var SICKComponentWrapper = function () {
  /**
   * Initializes a React component and returns a wrapper which provides access to the DOM Element
   * and additional APIs for manipulating that DOM Element
   * @param {Element} node The DOM Element to initialize (render) the component into.
   * @param {Object} properties The properties to be applied to the component.
   * @throws {Error} Throws Error when `init()` is called on the component directly.
   * @return {SICKComponentWrapper} The component wrapper.
   */
  function SICKComponentWrapper(component, node, properties) {
    (0, _classCallCheck3.default)(this, SICKComponentWrapper);

    /** @type {SICKComponent} */
    this.component = component;
    /** @type {Element} */
    this.node = node;

    // Create ReactComponent instance from the extending React class. Children not implemented yet.
    this._instance = (0, _reactDom.render)((0, _react.createElement)(component, properties), node);
  }

  /**
   * Tear down the React component and remove it from the DOM Element
   */


  (0, _createClass3.default)(SICKComponentWrapper, [{
    key: 'destroy',
    value: function destroy() {
      // Unmount the React component
      (0, _reactDom.unmountComponentAtNode)(this.node);
      this.component = null;
      this._instance = null;
      this.node = null;
    }

    /**
     * Update the component with new properties. Will cause the affected node trees to be re-rendered React style.
     * @param {Object} properties Component properties to update
     */

  }, {
    key: 'update',
    value: function update(properties) {
      var nextProperties = (0, _extends3.default)({}, this._instance.props, properties);
      // Re-render the node with the new properties merged into the old properties. preUpdateNode === postUpdateNode
      (0, _reactDom.render)((0, _react.createElement)(this.component, nextProperties), this.node);
    }
  }]);
  return SICKComponentWrapper;
}();

exports.default = SICKComponentWrapper;