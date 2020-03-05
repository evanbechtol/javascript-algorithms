const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const { countingSort } = require( "./counting-sort" );
const { generateArray } = require( "../../../util" );

describe( "", () => {
  describe( "Exposed methods", () => {
    it( "countingSort", () => {
      assert.isFunction( countingSort, "Method countingSort does not exist" );
    } );
  } );

  describe( "Counting Sort", () => {
    it( "Should sort array", () => {
      let arr = generateArray( 1000000, 100000 );
      let max = Math.max(arr);
      assert.deepEqual( countingSort( arr, 0, max ), arr.sort( ( a, b ) => a - b ), "Array not properly sorted" );
    } );
  } );
} );
