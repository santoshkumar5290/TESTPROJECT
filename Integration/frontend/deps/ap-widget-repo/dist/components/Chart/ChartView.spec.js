'use strict';

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChartView = require('./ChartView');

var _ChartView2 = _interopRequireDefault(_ChartView);

var _testing = require('../../utils/testing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (0, _jsx3.default)(_ChartView2.default, {});

describe('(Widget) Chart => ChartView', function () {
  var titleSelector = '.toolbar div span';
  var legendSelector = '.legend';

  it('should by default occupy 100% width and 700px height of the parent element', function () {
    var widget = (0, _testing.mountWithContext)(_ref);

    expect(widget).to.have.style('width', '100%');
    expect(widget).to.have.style('height', '700px');
  });

  it('should have the specified width and height', function () {
    var widget = (0, _testing.mountWithContext)((0, _jsx3.default)(_ChartView2.default, {
      styles: { container: { width: '40px', height: '20px' } }
    }));

    expect(widget).to.have.style('width', '40px');
    expect(widget).to.have.style('height', '20px');
  });

  it('should have specified title', function () {
    var title = Math.random().toString();
    var widget = (0, _testing.mountWithContext)((0, _jsx3.default)(_ChartView2.default, {
      title: title
    }));

    expect(widget.find(titleSelector)).to.have.text(title);
  });

  it('should have one legend when there are is one series', function () {
    var seriesSet = [{ name: Math.random().toString(), data: [] }];
    var widget = (0, _testing.mountWithContext)((0, _jsx3.default)(_ChartView2.default, {
      seriesSet: seriesSet
    }));

    expect(widget.find(legendSelector)).to.have.length(seriesSet.length);
  });

  it('should have one extra legend when there are more than one series', function () {
    var seriesSet = [{ name: Math.random().toString(), data: [] }, { name: Math.random().toString(), data: [] }];
    var widget = (0, _testing.mountWithContext)((0, _jsx3.default)(_ChartView2.default, {
      seriesSet: seriesSet
    }));

    expect(widget.find(legendSelector)).to.have.length(seriesSet.length + 1);
  });
});