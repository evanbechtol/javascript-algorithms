const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const { mergeSort } = require( "./merge-sort" );
const utils = require( "../../util" );

describe( "Merge Sort", () => {
  const length = 10000;
  const arr = utils.generateArray( length, length );

  it( "Should sort array", () => {
    assert.deepEqual( mergeSort( arr, "asc" ), arr.sort(utils.compare), `Arrays are not sorted identically` );
  } );
} );
