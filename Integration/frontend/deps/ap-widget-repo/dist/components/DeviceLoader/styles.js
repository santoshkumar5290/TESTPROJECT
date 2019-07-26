'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expandedStyles = exports.defaultStyles = undefined;

var _colors = require('material-ui/styles/colors');

var defaultStyles = exports.defaultStyles = {
  container: {
    display: 'inline-block',
    minWidth: 200,
    background: _colors.grey300,
    marginRight: 5,
    marginBottom: 5
  },
  deviceLoaderBar: {
    paddingLeft: 10,
    paddingRight: 10
  },
  imagesContainer: {
    display: 'flex',
    border: '2px solid ' + _colors.black,
    justifyContent: 'center'
  },
  image: {
    height: 300,
    width: 'auto',
    overflow: 'hidden',
    flexShrink: 0
  },
  imageContainer: {
    display: 'flex',
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  }
};

var expandedStyles = exports.expandedStyles = {
  container: {
    display: 'block',
    minWidth: 200,
    borderBottom: '2px solid ' + _colors.black,
    background: _colors.grey300,
    width: '100%'
  },
  imagesContainer: {
    display: 'flex'
  },
  image: {
    height: 300,
    width: 'auto',
    overflow: 'hidden',
    flexShrink: 0
  },
  titleBox: {
    width: 165,
    background: _colors.grey800,
    color: _colors.white,
    padding: 10,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    textAlign: 'center',
    borderRight: '2px solid ' + _colors.black
  },
  titleBoxBarcodeIndicator: {
    position: 'absolute',
    top: 5,
    right: 5
  },
  titleBoxContent: {
    fontSize: 15,
    lineHeight: '22px'
  },
  titleBoxHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    borderBottom: '2px solid ' + _colors.white,
    marginBottom: 10,
    paddingBottom: 10,
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  imageContainer: {
    display: 'flex',
    position: 'relative',
    borderRight: '2px solid ' + _colors.black
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  }
};