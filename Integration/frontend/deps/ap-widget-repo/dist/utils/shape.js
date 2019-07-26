"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBoundingBoxDimensions = getBoundingBoxDimensions;
/**
 * Get the bounding box of a skewed rectangle using its height and width with the angle of rotation.
 * @private
 */
function getBoundingBoxDimensions(crossAxis, mainAxis, angle) {
  var absSin = Math.abs(Math.sin(angle * Math.PI / 180));
  var absCos = Math.abs(Math.cos(angle * Math.PI / 180));

  return {
    crossAxis: absSin * mainAxis + absCos * crossAxis,
    mainAxis: absSin * crossAxis + absCos * mainAxis
  };
}