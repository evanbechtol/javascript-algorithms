const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const { mergeSort } = require( "./merge-sort" );
const utils = require( "../../util" );

describe( "Merge Sort", () => {
  const length = 1000000;
  const arr = utils.generateArray( length, length );
  const sortedArr = arr.sort( utils.compare );

  it( "Should sort array", () => {
    assert.deepEqual( mergeSort( arr, "asc" ), sortedArr, `Arrays are not sorted identically` );
  } );

  it ( "Should check native sort", () => {
    assert.deepEqual( arr.sort(), sortedArr, `Arrays are not sorted identically` );
  });
} );
