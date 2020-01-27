const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const Stack = require( "./index" );

describe( "Stacks", () => {
  // Create instance of class for our test
  const stack = new Stack();

  describe( "Exposed methods", () => {
    it( "Push", () => {
      assert.isFunction( stack.push, "Method 'push' does not exist" );
    } );

    it( "Pop", () => {
      assert.isFunction( stack.pop, "Method 'pop' does not exist" );
    } );
  } );
} );
