const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const { countStrings } = require( "./index" );

describe( "Count Strings", () => {
  it( "Should return 1 when n = 0", () => {
    assert.deepEqual( countStrings( 0 ), 1, `Incorrect result obtained` );
  } );

  it( "Should return 19 when n = 3", () => {
    assert.deepEqual( countStrings( 3 ), 19, `Incorrect result obtained` );
  } );

  it( "Should return 49 when n = 4", () => {
    assert.deepEqual( countStrings( 4 ), 39, `Incorrect result obtained` );
  } );
} );
