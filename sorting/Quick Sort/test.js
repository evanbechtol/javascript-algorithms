const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const quickSort = require( "./quick-sort" );

describe( "Quick Sort", () => {
  describe( "Exposed methods", () => {
    it( "quickSort", () => {
      assert.isFunction( quickSort.quickSort, `Method 'quickSort' does not exist` );
    } );
  } );

  describe( "quickSort", () => {
    let unsorted = [ 16, 4, 10, 14, 7, 9, 3, 2, 8, 1 ];
    const length = 1000000;
    let arr = [];
    for (let i = length; i > 0; i--) {
      // random array
      arr.push(parseInt(Math.random() * 1000000000));
    }

    it( "Should sort array", () => {
      assert.deepEqual( quickSort.quickSort( arr, 0, arr.length - 1, arr.length ), arr.sort(), `Array not sorted properly` );
    } );
  } );
} );
