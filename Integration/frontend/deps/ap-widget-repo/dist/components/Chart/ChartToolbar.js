'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _IconMenu = require('material-ui/IconMenu');

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _timeline = require('material-ui/svg-icons/action/timeline');

var _timeline2 = _interopRequireDefault(_timeline);

var _filterList = require('material-ui/svg-icons/content/filter-list');

var _filterList2 = _interopRequireDefault(_filterList);

var _cameraAlt = require('material-ui/svg-icons/image/camera-alt');

var _cameraAlt2 = _interopRequireDefault(_cameraAlt);

var _insertChart = require('material-ui/svg-icons/editor/insert-chart');

var _insertChart2 = _interopRequireDefault(_insertChart);

var _insertDriveFile = require('material-ui/svg-icons/editor/insert-drive-file');

var _insertDriveFile2 = _interopRequireDefault(_insertDriveFile);

var _fileDownload = require('material-ui/svg-icons/file/file-download');

var _fileDownload2 = _interopRequireDefault(_fileDownload);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _colors = require('material-ui/styles/colors');

var _Toolbar = require('material-ui/Toolbar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = (0, _jsx3.default)(_filterList2.default, {});

var _ref3 = (0, _jsx3.default)(_insertChart2.default, {
  color: _colors.darkBlack
});

var _ref4 = (0, _jsx3.default)(_timeline2.default, {
  color: _colors.darkBlack
});

var _ref5 = (0, _jsx3.default)(_insertChart2.default, {});

var _ref6 = (0, _jsx3.default)(_timeline2.default, {});

var _ref7 = (0, _jsx3.default)(_IconButton2.default, {}, void 0, (0, _jsx3.default)(_fileDownload2.default, {
  color: _colors.darkBlack
}));

var _ref8 = (0, _jsx3.default)(_cameraAlt2.default, {});

var _ref9 = (0, _jsx3.default)(_insertDriveFile2.default, {});

var ChartSidebar = function ChartSidebar(_ref) {
  var title = _ref.title,
      chartType = _ref.chartType,
      typeBar = _ref.typeBar,
      typeLine = _ref.typeLine,
      downloadCSV = _ref.downloadCSV,
      downloadImage = _ref.downloadImage,
      handleChartTypeSelection = _ref.handleChartTypeSelection,
      handleExportFile = _ref.handleExportFile,
      openSeriesDialog = _ref.openSeriesDialog,
      styles = _ref.styles,
      localization = _ref.localization,
      localizationSet = _ref.localizationSet;

  styles = (0, _extends3.default)({
    toolbarGroup: {
      flexGrow: 1,
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  }, styles);

  var origin = { horizontal: 'right', vertical: 'top' };

  return (0, _jsx3.default)(_Toolbar.Toolbar, {
    className: 'toolbar',
    style: styles.container
  }, void 0, (0, _jsx3.default)(_Toolbar.ToolbarGroup, {
    style: styles.toolbarGroup
  }, void 0, (0, _jsx3.default)(_Toolbar.ToolbarTitle, {
    text: title,
    style: styles.title
  })), (0, _jsx3.default)(_Toolbar.ToolbarGroup, {
    style: styles.group,
    lastChild: true
  }, void 0, openSeriesDialog && (0, _jsx3.default)(_IconButton2.default, {
    touch: true,
    style: { display: 'auto' },
    className: 'series-dialog-trigger',
    onClick: openSeriesDialog
  }, void 0, _ref2), (0, _jsx3.default)(_IconMenu2.default, {
    iconButtonElement: (0, _jsx3.default)(_IconButton2.default, {}, void 0, chartType === typeBar ? _ref3 : _ref4),
    anchorOrigin: origin,
    targetOrigin: origin,
    onItemTouchTap: handleChartTypeSelection
  }, void 0, (0, _jsx3.default)(_MenuItem2.default, {
    value: typeBar,
    primaryText: localization.formatMessage(localizationSet + ':chartTypeBar'),
    leftIcon: _ref5
  }), (0, _jsx3.default)(_MenuItem2.default, {
    value: typeLine,
    primaryText: localization.formatMessage(localizationSet + ':chartTypeLine'),
    leftIcon: _ref6
  })), (0, _jsx3.default)(_IconMenu2.default, {
    iconButtonElement: _ref7,
    anchorOrigin: origin,
    targetOrigin: origin,
    onItemTouchTap: handleExportFile
  }, void 0, (0, _jsx3.default)(_MenuItem2.default, {
    value: downloadImage,
    primaryText: localization.formatMessage(localizationSet + ':chartExportImage'),
    leftIcon: _ref8
  }), (0, _jsx3.default)(_MenuItem2.default, {
    value: downloadCSV,
    primaryText: localization.formatMessage(localizationSet + ':chartExportCSV'),
    leftIcon: _ref9
  }))));
};

exports.default = ChartSidebar;