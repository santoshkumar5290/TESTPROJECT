'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeviceConfigurator = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _immutable = require('immutable');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SICKPlatform = require('../../SICKPlatform');

var _colors = require('material-ui/styles/colors');

var _Stepper = require('material-ui/Stepper');

var _error = require('material-ui/svg-icons/alert/error');

var _error2 = _interopRequireDefault(_error);

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

var _GenericError = require('../Global/GenericError');

var _GenericError2 = _interopRequireDefault(_GenericError);

var _StartOverConfirmDialog = require('./Dialogs/StartOverConfirmDialog');

var _StartOverConfirmDialog2 = _interopRequireDefault(_StartOverConfirmDialog);

var _StepIdContent = require('./Steps/StepIdContent');

var _StepIdContent2 = _interopRequireDefault(_StepIdContent);

var _StepNameContent = require('./Steps/StepNameContent');

var _StepNameContent2 = _interopRequireDefault(_StepNameContent);

var _StepFamilyContent = require('./Steps/StepFamilyContent');

var _StepFamilyContent2 = _interopRequireDefault(_StepFamilyContent);

var _StepLabelContent = require('./Steps/StepLabelContent');

var _StepLabelContent2 = _interopRequireDefault(_StepLabelContent);

var _StepFtpContent = require('./Steps/StepFtpContent');

var _StepFtpContent2 = _interopRequireDefault(_StepFtpContent);

var _StepIpContent = require('./Steps/StepIpContent');

var _StepIpContent2 = _interopRequireDefault(_StepIpContent);

var _StepAddContent = require('./Steps/StepAddContent');

var _StepAddContent2 = _interopRequireDefault(_StepAddContent);

var _systemConfig = require('../../ducks/systemConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------
var styles = {
  title: {
    fontSize: 18,
    margin: 0,
    marginLeft: 15
  },
  subtitle: {
    fontSize: 14,
    margin: 0,
    color: '#999',
    marginLeft: 15
  },
  textField: {
    marginTop: 0,
    maxWidth: 170
  },
  stepDescription: {
    margin: '8px 0',
    fontSize: 13
  },
  textFieldError: {
    borderColor: _SICKMuiTheme2.default.textField.errorColor
  },
  errorText: {
    marginTop: 0,
    marginBottom: -30
  },
  errorIcon: {
    float: 'right',
    height: 16,
    width: 16
  },
  passwordLink: {
    position: 'absolute',
    left: 174,
    top: 36
  },
  passwordIcon: {
    height: 22,
    width: 22
  },
  informationLink: {
    position: 'absolute',
    left: 174,
    top: 36,
    zIndex: 9
  },
  informationLinkSelect: {
    position: 'absolute',
    left: 174,
    top: 18,
    zIndex: 9
  },
  informationIpLink: {
    position: 'absolute',
    left: 174,
    top: 5,
    zIndex: 99
  },
  informationIcon: {
    height: 22,
    width: 22
  },
  iconColor: _SICKMuiTheme2.default.palette.iconColor,
  actionButtons: {
    margin: '6px 0'
  },
  ipAddressField: {
    width: 30,
    height: 36,
    marginLeft: 4,
    marginRight: 4,
    textAlign: 'center'
  },
  stepButtonNextError: {
    marginTop: 24,
    marginRight: 10,
    height: 32,
    width: 72,
    minWidth: 62,
    maxWidth: 72
  },
  stepButtonBackError: {
    marginTop: 24,
    height: 32,
    width: 72,
    minWidth: 62,
    maxWidth: 72
  },
  buttonNext: {
    marginRight: 10,
    height: 32,
    width: 72,
    minWidth: 62,
    maxWidth: 72
  },
  buttonBack: {
    height: 32,
    width: 72,
    minWidth: 62,
    maxWidth: 72
  }

  // defines an empty device structure
};var _getEmptyDevice = function _getEmptyDevice() {
  return {
    'deviceId': '',
    'name': '',
    'family': '',
    'label': '',
    'ftpInformation': {
      'username': '',
      'password': ''
    },
    'ipAddress': ''
  };
};

// the steps keys
var steps = ['deviceId', 'name', 'family', 'label', 'ftpInformation', 'ipAddress'];

// keys of the mandatory steps
var mandatorySteps = ['deviceId', 'name', 'family'];

// ------------------------------------
// Colors
// ------------------------------------


// ------------------------------------
// Components
// ------------------------------------

// ------------------------------------
// Helpers
// ------------------------------------

// states that have implications in the render (e.g. dialogs, snackbars)
var infoStates = [_systemConfig.DEVICE_START_OVER_STATUS, _systemConfig.DEVICE_ERROR_STATUS, _systemConfig.DEVICE_ADDED_STATUS, _systemConfig.GENERIC_ERROR_STATUS, _systemConfig.DEVICE_ADDED_UNDO_STATUS];

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    status: state.systemConfig.get('status'),
    wsErrors: state.systemConfig.get('wsErrors'),
    items: state.systemConfig.get('items'),
    lastInsertedId: state.systemConfig.get('lastInsertedId')
  };
};

/**
 * Component that can be used to configure devices in the system.
 *
 * @private
 */

var _ref = (0, _jsx3.default)(_error2.default, {
  color: _colors.red500
});

var _ref2 = (0, _jsx3.default)(_GenericError2.default, {
  open: true,
  title: 'System Configuration',
  message: 'Something went wrong'
});

var _ref3 = (0, _jsx3.default)(_Snackbar2.default, {
  open: true,
  message: 'Your device information was reset. Click on a step to get started.',
  autoHideDuration: 5000
});

var _ref4 = (0, _jsx3.default)(_Snackbar2.default, {
  open: true,
  message: 'Your action was reverted.',
  autoHideDuration: 5000
});

var DeviceConfigurator = exports.DeviceConfigurator = function (_React$Component) {
  (0, _inherits3.default)(DeviceConfigurator, _React$Component);

  /** @ignore */


  /** @ignore */
  function DeviceConfigurator(props, context) {
    (0, _classCallCheck3.default)(this, DeviceConfigurator);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DeviceConfigurator.__proto__ || (0, _getPrototypeOf2.default)(DeviceConfigurator)).call(this, props, context));

    _this._handleNext = function () {
      if (_this.state.stepIndex < steps.length) {
        _this.setState({ stepIndex: _this.state.stepIndex + 1 });
      }
    };

    _this._handlePrev = function () {
      if (_this.state.stepIndex > 0) {
        _this.setState({ stepIndex: _this.state.stepIndex - 1 });
      }
    };

    _this._handleAddDevice = function () {
      _this.props.addDevice(_this.props.url, _this.state.device);
    };

    _this._handleAddRetry = function () {
      _this.setState({
        stepIndex: steps.indexOf(_this.props.wsErrors.keys().next().value)
      });
    };

    _this._handleAddUndo = function () {
      var device = _this.props.items.get(_this.props.lastInsertedId);
      _this.props.undoAddDevice(_this.props.url, device.id, device.deviceId);
    };

    _this._handleStartOverConfirmDialog = function () {
      _this.setState({ startOverConfirm: true });
    };

    _this._handleStartOver = function () {
      (0, _systemConfig.startOver)();
    };

    _this._handleStartOverDismiss = function () {
      _this.setState({ startOverConfirm: false });
    };

    _this._handleStep = function (id) {
      _this.setState({ stepIndex: id - 1 });
    };

    _this.state = {
      stepIndex: 99,
      device: _getEmptyDevice(),
      errors: new _immutable.Map(),
      startOverConfirm: false

      /** @private */
    };_this._handleNext = _this._handleNext.bind(_this);
    _this._handlePrev = _this._handlePrev.bind(_this);
    _this._handleStep = _this._handleStep.bind(_this);
    _this._handleFieldChange = _this._handleFieldChange.bind(_this);
    _this._handleAddDevice = _this._handleAddDevice.bind(_this);
    _this._handleStartOver = _this._handleStartOver.bind(_this);
    _this._handleStartOverConfirmDialog = _this._handleStartOverConfirmDialog.bind(_this);
    _this._handleStartOverDismiss = _this._handleStartOverDismiss.bind(_this);
    _this._handleAddRetry = _this._handleAddRetry.bind(_this);
    _this._handleAddUndo = _this._handleAddUndo.bind(_this);
    _this._getIcon = _this._getIcon.bind(_this);
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(DeviceConfigurator, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextStatus = nextProps.status;

      if (nextStatus === _systemConfig.DEVICE_ERROR_STATUS) {
        this.setState({
          errors: nextProps.wsErrors,
          stepIndex: 99
        });
      } else if (nextStatus === _systemConfig.DEVICE_START_OVER_STATUS) {
        this.setState({
          device: _getEmptyDevice(),
          stepIndex: 99,
          errors: new _immutable.Map(),
          startOverConfirm: false
        });
      } else if (nextStatus === _systemConfig.DEVICE_ADDED_STATUS) {
        this.setState({
          device: _getEmptyDevice(),
          stepIndex: 99,
          errors: new _immutable.Map()
        });
      } else if (nextStatus === _systemConfig.GENERIC_ERROR_STATUS) {
        this.setState({
          stepIndex: 99
        });
      }
    }

    /** @ignore */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (infoStates.indexOf(prevProps.status) > -1 && prevProps.status === this.props.status) {
        prevProps.clearStatus();
      }
    }

    /** @ignore */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.clearStatus();
    }

    /* moves to the next step */


    /* moves to the previous step */


    /* adds a new device */


    /* handles the retry link by moving to the first error step */


    /* undoes a device add */


    /* open the start over confirmation dialog */


    /* execute the start over interaction (reset the fields) */


    /* closes the start over dialog */


    /* helper function for positioning the stepper in an specific step */

  }, {
    key: '_handleFieldChange',


    /*
     * processes an input field change
     * this will be called every time user changes the input value
     * it will check if the value is valid and if not
     * will set the corresponding field key in the errors map
     */
    value: function _handleFieldChange(key, value, valid) {
      var _state = this.state,
          device = _state.device,
          errors = _state.errors;

      device[key] = value;
      var nextErrors = errors;
      if (valid) {
        nextErrors = nextErrors.delete(key);
      } else {
        nextErrors = nextErrors.set(key, 1);
      }
      this.setState({ device: device, errors: nextErrors });
    }

    /* retrieves the correct step icon (index number or error) */

  }, {
    key: '_getIcon',
    value: function _getIcon(name, index) {
      var errors = this.state.errors;

      return errors.has(name) ? _ref : index;
    }

    /*
     * checks if the form has errors
     * validating the errors map
     * and confirming if any of the mandatorySteps wasn't filled
     */

  }, {
    key: '_validateErrors',
    value: function _validateErrors() {
      var _state2 = this.state,
          device = _state2.device,
          errors = _state2.errors;

      if (errors.size > 0) {
        return false;
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(mandatorySteps), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var step = _step.value;

            if (device[step].length === 0) {
              return false;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      return true;
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          status = _props.status,
          style = _props.style,
          onInfoOpen = _props.onInfoOpen;
      var _state3 = this.state,
          stepIndex = _state3.stepIndex,
          device = _state3.device,
          errors = _state3.errors,
          startOverConfirm = _state3.startOverConfirm;
      var deviceId = device.deviceId,
          name = device.name,
          family = device.family,
          label = device.label,
          ftpInformation = device.ftpInformation,
          ipAddress = device.ipAddress;

      // common actions to pass as props to the each step content component

      var actions = {
        onChange: this._handleFieldChange,
        onNext: this._handleNext,
        onPrev: this._handlePrev,
        styles: styles,
        onInfoOpen: onInfoOpen
      };

      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('h3', {
        style: styles.title
      }, void 0, 'Add a device to the system'), (0, _jsx3.default)('p', {
        style: styles.subtitle
      }, void 0, 'Click a step to get started.')), (0, _jsx3.default)(_Stepper.Stepper, {
        activeStep: stepIndex,
        linear: false,
        orientation: 'vertical'
      }, void 0, (0, _jsx3.default)(_Stepper.Step, {}, void 0, (0, _jsx3.default)(_Stepper.StepButton, {
        name: 'step-1',
        onTouchTap: function onTouchTap() {
          return _this2._handleStep(1);
        },
        icon: this._getIcon('deviceId', 1)
      }, void 0, 'Enter Device ID'), (0, _jsx3.default)(_Stepper.StepContent, {}, void 0, _react2.default.createElement(_StepIdContent2.default, (0, _extends3.default)({}, actions, { value: deviceId, error: errors.has('deviceId') })))), (0, _jsx3.default)(_Stepper.Step, {}, void 0, (0, _jsx3.default)(_Stepper.StepButton, {
        name: 'step-2',
        onTouchTap: function onTouchTap() {
          return _this2._handleStep(2);
        },
        icon: this._getIcon('name', 2)
      }, void 0, 'Enter Device Name'), (0, _jsx3.default)(_Stepper.StepContent, {}, void 0, _react2.default.createElement(_StepNameContent2.default, (0, _extends3.default)({}, actions, { value: name, error: errors.has('name') })))), (0, _jsx3.default)(_Stepper.Step, {}, void 0, (0, _jsx3.default)(_Stepper.StepButton, {
        name: 'step-3',
        onTouchTap: function onTouchTap() {
          return _this2._handleStep(3);
        },
        icon: this._getIcon('family', 3)
      }, void 0, 'Select Device Model/Family'), (0, _jsx3.default)(_Stepper.StepContent, {}, void 0, _react2.default.createElement(_StepFamilyContent2.default, (0, _extends3.default)({}, actions, { value: family, error: errors.has('family') })))), (0, _jsx3.default)(_Stepper.Step, {}, void 0, (0, _jsx3.default)(_Stepper.StepButton, {
        name: 'step-4',
        onTouchTap: function onTouchTap() {
          return _this2._handleStep(4);
        },
        icon: this._getIcon('label', 4)
      }, void 0, 'Enter Device Label', (0, _jsx3.default)('span', {
        style: style.optional
      }, void 0, 'Optional')), (0, _jsx3.default)(_Stepper.StepContent, {}, void 0, _react2.default.createElement(_StepLabelContent2.default, (0, _extends3.default)({}, actions, { value: label })))), (0, _jsx3.default)(_Stepper.Step, {}, void 0, (0, _jsx3.default)(_Stepper.StepButton, {
        name: 'step-5',
        onTouchTap: function onTouchTap() {
          return _this2._handleStep(5);
        },
        icon: this._getIcon('ftpInformation', 5)
      }, void 0, 'Specify FTP login information', (0, _jsx3.default)('span', {
        style: style.optional
      }, void 0, 'Optional')), (0, _jsx3.default)(_Stepper.StepContent, {}, void 0, _react2.default.createElement(_StepFtpContent2.default, (0, _extends3.default)({}, actions, { value: ftpInformation })))), (0, _jsx3.default)(_Stepper.Step, {}, void 0, (0, _jsx3.default)(_Stepper.StepButton, {
        name: 'step-6',
        onTouchTap: function onTouchTap() {
          return _this2._handleStep(6);
        },
        icon: this._getIcon('ipAddress', 6)
      }, void 0, 'Enter Device IP Address', (0, _jsx3.default)('span', {
        style: style.optional
      }, void 0, 'Optional')), (0, _jsx3.default)(_Stepper.StepContent, {}, void 0, _react2.default.createElement(_StepIpContent2.default, (0, _extends3.default)({}, actions, { value: ipAddress })))), (0, _jsx3.default)(_Stepper.Step, {}, void 0, (0, _jsx3.default)(_Stepper.StepButton, {
        name: 'step-7',
        onTouchTap: function onTouchTap() {
          return _this2._handleStep(7);
        }
      }, void 0, 'Add Device to Configuration'), (0, _jsx3.default)(_Stepper.StepContent, {}, void 0, (0, _jsx3.default)(_StepAddContent2.default, {
        styles: styles,
        addEnabled: this._validateErrors(),
        onAdd: this._handleAddDevice,
        onStartOver: this._handleStartOverConfirmDialog
      })))), startOverConfirm && (0, _jsx3.default)(_StartOverConfirmDialog2.default, {
        open: true,
        onStartOver: this._handleStartOver,
        onGoBack: this._handleStartOverDismiss
      }), status === _systemConfig.GENERIC_ERROR_STATUS && _ref2, status === _systemConfig.DEVICE_ADDED_STATUS && (0, _jsx3.default)(_Snackbar2.default, {
        open: true,
        message: 'Your device with name ' + name + ' was succesfully added',
        autoHideDuration: 10000,
        action: 'undo',
        onActionTouchTap: this._handleAddUndo
      }), status === _systemConfig.DEVICE_ERROR_STATUS && (0, _jsx3.default)(_Snackbar2.default, {
        open: true,
        message: 'Your device could not be added. Please verify the information you have entered',
        autoHideDuration: 7000,
        action: 'retry',
        onActionTouchTap: this._handleAddRetry
      }), status === _systemConfig.DEVICE_START_OVER_STATUS && _ref3, status === _systemConfig.DEVICE_ADDED_UNDO_STATUS && _ref4);
    }
  }]);
  return DeviceConfigurator;
}(_react2.default.Component);

DeviceConfigurator.defaultProps = {
  status: '',
  wsErrors: new _immutable.Map() };
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, (0, _extends3.default)({}, _systemConfig.actions))(DeviceConfigurator);