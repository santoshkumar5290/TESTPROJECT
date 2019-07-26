'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchFilter = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _colors = require('material-ui/styles/colors');

var _timelineData = require('../../ducks/timelineData');

var _exportData = require('../../ducks/exportData');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _search = require('material-ui/svg-icons/action/search');

var _search2 = _interopRequireDefault(_search);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

var _clear = require('material-ui/svg-icons/content/clear');

var _clear2 = _interopRequireDefault(_clear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var styles = {
  container: {
    display: 'flex',
    margin: 0
  },
  textOpen: {
    width: '300px',
    overflow: 'visible',
    transition: '0.5s ease'
  },
  textClose: {
    width: '0',
    overflow: 'hidden',
    transition: '0.5s ease'
  },
  clearIconButton: {
    width: 50
  },
  textFieldHint: {
    color: _colors.grey500
  }

  // ------------------------------------
  // Helpers
  // ------------------------------------

};

// ------------------------------------
// Components
// ------------------------------------

// ------------------------------------
// Action creators
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    timelineData: state.timelineData.get(ownProps.group)
  };
};

/**
 * Provides a search form for timeline grid.
 *
 * @private
 */

var SearchFilter = exports.SearchFilter = function (_React$Component) {
  (0, _inherits3.default)(SearchFilter, _React$Component);

  /** @ignore */
  function SearchFilter(props, context) {
    (0, _classCallCheck3.default)(this, SearchFilter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SearchFilter.__proto__ || (0, _getPrototypeOf2.default)(SearchFilter)).call(this, props, context));

    _this.state = {
      active: false,
      error: '',
      text: ''

      /** @private */
    };_this._handleSearchClicked = _this._handleSearchClicked.bind(_this);
    _this._handleSearchTextChanged = _this._handleSearchTextChanged.bind(_this);
    _this._handleSubmit = _this._handleSubmit.bind(_this);
    _this._triggerSearch = _this._triggerSearch.bind(_this);
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(SearchFilter, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_handleSubmit',
    value: function _handleSubmit(e) {
      if (e) {
        e.preventDefault();
      }
      if (this.state.text.length <= 0) {
        return;
      }

      this._triggerSearch(e, this.state.text);
    }
  }, {
    key: '_triggerSearch',
    value: function _triggerSearch(e) {
      var searchTerm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var _props = this.props,
          group = _props.group,
          requestPackage = _props.requestPackage,
          setExportParams = _props.setExportParams;

      if (searchTerm) {
        requestPackage(group, { searchTerm: searchTerm, action: 'refresh' });
      } else {
        requestPackage(group, { searchTerm: '', action: 'refresh' });
        this.setState({
          text: '',
          error: ''
        });
      }

      // clear checked rows on applied filter
      setExportParams(group, {});
    }
  }, {
    key: '_handleSearchClicked',
    value: function _handleSearchClicked() {
      if (this.state.active) {
        this._triggerSearch();
      }
      this.setState({
        active: !this.state.active
      });
    }
  }, {
    key: '_handleSearchTextChanged',
    value: function _handleSearchTextChanged(e) {
      // error on special characters or only spaces
      if (!/^[A-Z0-9,. ]*$/i.test(e.target.value) || /^[ ]+/i.test(e.target.value)) {
        this.setState({
          error: 'No special characters allowed!',
          text: this.state.text
        });
      } else {
        this.setState({
          error: '',
          text: e.target.value
        });
      }
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var actionIconColor = _SICKMuiTheme2.default.palette.iconColor;

      return (0, _jsx3.default)('form', {
        style: styles.container,
        onSubmit: this._handleSubmit
      }, void 0, (0, _jsx3.default)(_IconButton2.default, {
        onClick: this._handleSearchClicked
      }, void 0, (0, _jsx3.default)(_search2.default, {
        color: actionIconColor
      })), _react2.default.createElement(_TextField2.default, {
        ref: 'searchField',
        hintText: 'Search',
        hintStyle: styles.textFieldHint,
        errorText: this.state.error,
        value: this.state.text,
        onChange: this._handleSearchTextChanged,
        style: this.state.active ? styles.textOpen : styles.textClose,
        underlineStyle: { borderColor: _colors.teal500 },
        underlineFocusStyle: { borderColor: _colors.teal500 }
      }), this.state.text && (0, _jsx3.default)(_IconButton2.default, {
        onClick: this._triggerSearch,
        style: styles.clearIconButton
      }, void 0, (0, _jsx3.default)(_clear2.default, {
        color: actionIconColor
      })));
    }
  }]);
  return SearchFilter;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps, (0, _extends3.default)({}, _timelineData.actions, _exportData.actions))(SearchFilter);