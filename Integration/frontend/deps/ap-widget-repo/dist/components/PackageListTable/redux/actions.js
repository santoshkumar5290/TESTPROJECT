'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateSortableCards = function updateSortableCards(packageListColumns) {
  return {
    type: _constants2.default.UPDATE_PACKAGE_LIST_COLUMNS,
    packageListColumns: packageListColumns
  };
};

exports.default = {
  updateSortableCards: updateSortableCards
};