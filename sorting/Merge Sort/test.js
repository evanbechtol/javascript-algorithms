const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const { mergeSort } = require( "./merge-sort" );
const utils = require( "../../util" );

describe( "Merge Sort", () => {
  const length = 10000;
  const arr = utils.generateArray( length, length );
  let sortedArr = Array.from( arr );
  sortedArr.sort( utils.compare );

  it( "Should sort array", () => {
    assert.deepEqual( mergeSort( arr, "asc" ), sortedArr, `Arrays are not sorted identically` );
  } );

  it( "Should check native sort", () => {
    assert.deepEqual( arr.sort( utils.compare ), sortedArr, `Arrays are not sorted identically` );
  } );
} );
