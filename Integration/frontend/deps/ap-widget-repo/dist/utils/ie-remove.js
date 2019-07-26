'use strict';

// From fix-ie git+https://github.com/Alhadis/Fix-IE.git
/* eslint-disable */

/** ChildNode.remove */
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}