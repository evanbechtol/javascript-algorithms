const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const quickSort = require( "./quick-sort" );
const { generateArray } = require( "../../util" );

describe( "Quick Sort", () => {
  describe( "Exposed methods", () => {
    it( "quickSort", () => {
      assert.isFunction( quickSort.quickSort, `Method 'quickSort' does not exist` );
    } );
  } );

  describe( "quickSort", () => {
    const length = 100000;
    let arr = generateArray( length );

    it( "Should sort array", () => {
      assert.deepEqual( quickSort.quickSort( arr, 0, arr.length - 1, arr.length ), arr.sort(), `Array not sorted properly` );
    } );
  } );
} );
