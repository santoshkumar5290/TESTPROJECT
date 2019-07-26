'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FitText = undefined;

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SICKPlatform = require('../../SICKPlatform');

var _colors = require('material-ui/styles/colors');

var _defaults = require('../../utils/defaults');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @private Canvas context that will be used by all instances */
var context = document.createElement('canvas').getContext('2d');

// ------------------------------------
// Constants
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    theme: state.config.theme || _defaults.DEFAULT_EMPTY_OBJECT
  };
};

/* eslint-disable */
/**
 * Component for resizing text to fit into the container element.
 *
 * It adjusts the font size first within the allowed range to fit the text.
 *
 * If adjusting font size still produces overflown text, it replaces the first few characters with ".." to fit into
 * the parent element.
 *
 * @private
 */
/* eslint-enable */

var FitText = exports.FitText = function (_Component) {
  (0, _inherits3.default)(FitText, _Component);

  function FitText() {
    (0, _classCallCheck3.default)(this, FitText);
    return (0, _possibleConstructorReturn3.default)(this, (FitText.__proto__ || (0, _getPrototypeOf2.default)(FitText)).apply(this, arguments));
  }

  (0, _createClass3.default)(FitText, [{
    key: 'getFinalSizeText',


    /* eslint-disable */
    /**
     * This method calculates the final font size and text based on the font style and input props
     *
     * @returns {Object} the final font size and final text to be displayed
     *
     * Using HTML5 Canvas to calculate the width of the text without adding it to the target HTML element.
     *
     * Logic to find the correct font size and the truncated text
     *      1. Find the width of the text using the minimal font size allowed (minFontSize)
     *      2. If the whole text can fit into the container using minimum font,
     *              -- calculate the scale factor (container width / minFontSize)
     *              -- Increase the font size by multiplying with the scale factor. Use the max of this font size and maxfontsize allowed
     *      3. Else
     *              -- find the "approx." per character width based on total width and text length
     *              -- calculate the overflown text width
     *              -- calculate the number of characters to truncate (charsToTruncate)
     *              -- Replace the first "charsToTruncate" characters in the text with ".."
     */
    /* eslint-enable */


    /** @ignore */
    value: function getFinalSizeText() {
      var _props = this.props,
          angle = _props.angle,
          minFontSize = _props.minFontSize,
          maxFontSize = _props.maxFontSize,
          text = _props.text;


      context.font = this.getFont();

      var parentWidth = this.props.parentWidth;
      var absAngle = Math.abs(angle);

      /*
       * If the angle of rotation is greater than 70 degrees, use parent height instead of width.
       * If the angle is between 20 and 70, use the min of parent height, parent width
       */
      if (absAngle > 70) {
        parentWidth = this.props.parentHeight;
      } else if (absAngle > 20 && absAngle <= 70) {
        parentWidth = Math.min(this.props.parentWidth, this.props.parentHeight);
      }

      var finalSize = minFontSize;
      var finalText = text;

      /*
       * Check if there is space to fit at least last digit on the parent element. If not, don't display the text
       */
      var minText = '..' + text.slice(-1);
      var minTextWidth = context.measureText(minText).width;

      if (parentWidth < minTextWidth) {
        finalText = '';

        return {
          finalSize: finalSize,
          finalText: finalText
        };
      }

      var width = context.measureText(text).width;

      if (width <= parentWidth) {
        var factor = parentWidth / width;
        var size = Math.floor(minFontSize * factor);

        finalSize = size > maxFontSize ? maxFontSize : size;
      } else {
        var charWidth = width / text.length;
        var diff = width - parentWidth;
        // Adding +2 to make room for ".." prefix
        var charsToTruncate = Math.floor(diff / charWidth) + 2;
        var substring = text.substring(charsToTruncate);

        finalText = '..' + substring;
      }

      return {
        finalSize: finalSize,
        finalText: finalText
      };
    }

    /** @ignore */

  }, {
    key: 'getFontFamily',
    value: function getFontFamily() {
      return this.props.theme.fontFamily && this.props.theme.fontFamily || 'Source Sans Pro';
    }
  }, {
    key: 'getFont',
    value: function getFont() {
      var _props2 = this.props,
          minFontSize = _props2.minFontSize,
          unit = _props2.unit;


      var fontFamily = this.getFontFamily();

      return '' + minFontSize + unit + ' ' + fontFamily;
    }
  }, {
    key: 'getFontColor',
    value: function getFontColor() {
      var bgColor = this.hexToRgb(this.props.bgColor);

      if (bgColor) {
        var brightness = (bgColor.r * 299 + bgColor.g * 587 + bgColor.b * 114) / 255000;
        return brightness >= 0.5 ? _colors.darkBlack : _colors.darkWhite;
      } else {
        return _colors.darkBlack;
      }
    }
  }, {
    key: 'hexToRgb',
    value: function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _getFinalSizeText = this.getFinalSizeText(),
          finalSize = _getFinalSizeText.finalSize,
          finalText = _getFinalSizeText.finalText;

      var finalStyles = {
        height: this.props.parentHeight,
        width: this.props.parentWidth,
        transform: 'rotate(' + this.props.angle + 'deg)',
        fontSize: finalSize,
        lineHeight: this.props.parentHeight + 'px',
        textAlign: 'center',
        color: this.getFontColor()
      };

      return (0, _jsx3.default)('div', {
        style: finalStyles
      }, void 0, finalText);
    }
  }]);
  return FitText;
}(_react.Component);

FitText.defaultProps = {
  angle: 0,
  unit: 'px',
  minFontSize: 12,
  maxFontSize: 16,
  text: '',
  bgColor: '#FFFFFF' };
exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(FitText);