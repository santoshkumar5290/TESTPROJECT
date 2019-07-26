'use strict';

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextLiveView = require('./TextLiveView');

var _TextLiveView2 = _interopRequireDefault(_TextLiveView);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _testing = require('../../utils/testing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (0, _jsx3.default)(_TextLiveView2.default, {});

var _ref2 = (0, _jsx3.default)(_TextLiveView2.default, {});

var _ref3 = (0, _jsx3.default)(_TextLiveView2.default, {});

describe('(Widget) TextLiveView => TextLiveView SFC', function () {
  var titleSelector = '.text-live-view-title input';
  var contentSelector = '.text-live-view-content';

  it('should by default occupy 100% width and height of the parent element', function () {
    var wrapper = (0, _testing.mountWithContext)(_ref);

    expect(wrapper).to.have.style('width', '100%');
    expect(wrapper).to.have.style('height', '100%');
  });

  it('If the width and height are explicitly specified, then it should conform to those values', function () {
    var wrapper = (0, _testing.mountWithContext)((0, _jsx3.default)(_TextLiveView2.default, {
      containerStyle: { width: '40px', height: '20px' }
    }));

    expect(wrapper).to.have.style('width', '40px');
    expect(wrapper).to.have.style('height', '20px');
  });

  it('should consist of a title and content', function () {
    // Random title and content strings.
    var title = Math.random().toString(24).slice(2);
    var content = Math.random().toString(24).slice(2);
    var widget = (0, _testing.mountWithContext)((0, _jsx3.default)(_TextLiveView2.default, {
      title: title,
      content: content
    }));
    expect(widget.find(titleSelector).get(0).value).to.equal(title);
    expect(widget.find(contentSelector)).to.have.text(content);
  });

  it('If the text of the title or the content is longer than the bounds of the widget,\n    there should be an appropriate indication of the overflow', function () {
    // Very long content.
    var content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
    var contentHeight = '20px';
    var widget = (0, _testing.mountWithContext)((0, _jsx3.default)(_TextLiveView2.default, {
      content: content,
      width: '100px',
      height: '150px',
      contentStyle: {
        height: contentHeight
      }
    }));
    // FIXME ideally, we should check for the existance of ellipsis in content
    // div. However, in browser, div content remains the same while overflowing
    // content gets truncated and replaced by ellipsis.
    // For now, we'll justcheck that DomDomDom config is sound.
    expect(widget.find(contentSelector)).to.have.style('height', contentHeight);
  });

  it('The content of the widget should support multiple formats, including but not limited\n   to, percentages, time zones, currencies, formatted numbers, dates, times, fractions\n   and scientific notations (including superscripts and subscripts', function () {
    // String containing potential characters.
    var content = '%-_$09AZaz¼½²₀';
    var widget = (0, _testing.mountWithContext)((0, _jsx3.default)(_TextLiveView2.default, {
      content: content
    }));
    expect(widget.find(contentSelector)).to.have.text(content);
  });

  it('The title text and content should be left-aligned by default', function () {
    var widget = (0, _testing.mountWithContext)(_ref2);

    expect(widget.children(_TextField2.default)).to.have.style('textAlign', 'left');
    expect(widget.children('div')).to.have.style('textAlign', 'left');
  });

  it('The title text should follow "Subheader" text style of the SICK theme,\n  while content should follow "Heading" text style.', function () {
    var widget = (0, _testing.mountWithContext)(_ref3);
    var title = widget.children(_TextField2.default);
    var content = widget.children('div');
    expect(title).to.have.style('font-size');
    expect(title).to.have.style('color');
    expect(title).to.have.style('line-height');
    expect(content).to.have.style('font-size');
    expect(content).to.have.style('color');
    expect(content).to.have.style('line-height');
  });

  it('The title of the widget can be implemented as a standard material UI text field with\n    the default value already populated.', function () {
    var title = Math.random().toString(24).slice(2);
    var widget = (0, _testing.mountWithContext)((0, _jsx3.default)(_TextLiveView2.default, {
      title: title
    }));

    expect(widget.find(_TextField2.default)).to.have.lengthOf(1);
    expect(widget.find(titleSelector).get(0).value).to.equal(title);
  });

  it('style parameters of the title and content text (including font color)\n  should be configurable by the product developer.', function () {
    var style = { color: 'red', fontSize: '72px', lineHeight: '64px' };
    var widget = (0, _testing.mountWithContext)((0, _jsx3.default)(_TextLiveView2.default, {
      titleStyle: style,
      contentStyle: style
    }));

    var titleWrapper = widget.children(_TextField2.default);
    var contentWrapper = widget.children('div');
    expect(titleWrapper).to.have.style('font-size');
    expect(titleWrapper).to.have.style('color');
    expect(titleWrapper).to.have.style('line-height');
    expect(contentWrapper).to.have.style('font-size');
    expect(contentWrapper).to.have.style('color');
    expect(contentWrapper).to.have.style('line-height');
  });
});