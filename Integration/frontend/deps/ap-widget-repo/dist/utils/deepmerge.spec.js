'use strict';

var _deepmerge = require('./deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _deepFreezeStrict = require('deep-freeze-strict');

var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @test {(Utility -> Function) deepmerge} */
describe('(Utility -> Function) deepmerge', function () {
  it('Should merge correctly when the next object has a different array of items', function () {
    var original = (0, _deepFreezeStrict2.default)({
      one: {
        array: ['a', 'b', 'c'],
        two: {
          array: ['d', 'e', 'f'],
          three: {
            array: [1, 2, 3]
          }
        }
      }
    });

    // Test keeping number of items the same but array has different values
    var nextOneArray = ['a', 'e', 'c'];

    // Test removing one item from the array
    var nextTwoArray = ['d', 'f'];

    // Test adding more items to the array
    var nextThreeArray = [1, 2, 3, 4, { foo: 'bar' }, function () {}];

    var next = (0, _deepFreezeStrict2.default)({
      one: {
        array: nextOneArray,
        two: {
          array: nextTwoArray,
          three: {
            array: nextThreeArray
          }
        }
      }
    });

    var newObject = (0, _deepmerge2.default)(original, next);

    expect(newObject.one.array).to.deep.equal(nextOneArray);

    expect(newObject.one.two.array).to.deep.equal(nextTwoArray);

    expect(newObject.one.two.three.array).to.deep.equal(nextThreeArray);
  });

  it('Should remove property if the next object set it\'s value to undefined', function () {
    var original = (0, _deepFreezeStrict2.default)({
      one: {
        two: {
          three: { foo: 'bar' }
        }
      }
    });

    var next = (0, _deepFreezeStrict2.default)({
      one: {
        two: {
          three: undefined
        }
      }
    });

    var newObject = (0, _deepmerge2.default)(original, next);

    expect(newObject.one.two).to.not.have.property('three');
  });
});