const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const quickSort = require( "./quick-sort" );
const { generateArray } = require( "../../../util" );
const utils = require( "../../../util" );

describe( "Quick Sort", () => {
  describe( "Exposed methods", () => {
    it( "quickSort", () => {
      assert.isFunction( quickSort.quickSort, `Method 'quickSort' does not exist` );
    } );
  } );

  describe( "quickSort", () => {
    const length = 500000;
    const arr = generateArray( length, length );
    let sortedArr = Array.from( arr );
    sortedArr.sort( utils.compare );

    it( "Should sort array", () => {
      assert.deepEqual( quickSort.quickSort( arr, 0, arr.length - 1, arr.length ), sortedArr, `Array not sorted properly` );
    } );

    it ( "Should check native sort", () => {
      assert.deepEqual( arr.sort( utils.compare ), sortedArr, `Arrays are not sorted identically` );
    });
  } );
} );
