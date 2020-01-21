const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const { insertionSort } = require( "./merge-sort" );

describe( "Merge Sort", () => {
  const arr = {
    sorted: [ 0, 1, 2, 3, 4, 5 ],
    unsorted: [ 10, 4, 8, 3, 66, 1, 0, 9 ]
  };

  it( "Should not change sorted array", () => {
    assert.deepEqual( insertionSort( arr.sorted ), arr.sorted, `Arrays are not sorted identically` );
  } );

  it( "Should sort unsorted array", () => {
    assert.deepEqual( insertionSort( arr.unsorted ), arr.unsorted.sort(), `Arrays are not sorted identically` );
  } );
} );
