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
    it( "Should sort array", () => {
      assert.deepEqual( quickSort.quickSort( unsorted, 0, unsorted.length - 1, unsorted.length ), [ 1, 2, 3, 4, 7, 8, 9, 10, 14, 16 ], `Array not sorted properly` );
    } );
  } );
} );
