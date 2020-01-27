const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const Stack = require( "./index" );

describe( "Stacks", () => {
  // Create instance of class for our test
  const stack = new Stack();

  describe( "Exposed methods", () => {
    it( "push", () => {
      assert.isFunction( stack.push, "Method 'push' does not exist" );
    } );

    it( "pop", () => {
      assert.isFunction( stack.pop, "Method 'pop' does not exist" );
    } );

    it( "isEmpty", () => {
      assert.isFunction( stack.isEmpty, "Method 'isEmpty' does not exist" );
    } );

    it( "getTop", () => {
      assert.isFunction( stack.getTop, "Method 'getTop' does not exist" );
    } );

    it( "setTop", () => {
      assert.isFunction( stack.setTop, "Method 'setTop' does not exist" );
    } );

    it( "getStack", () => {
      assert.isFunction( stack.getStack, "Method 'getStack' does not exist" );
    } );
  } );

  describe( "Initialization", () => {
    it( "Should initialize empty array", () => {
      assert.deepEqual( stack.getStack().length, 0, "Array does not have length 0" );
    } );

    it( "Should have top value of 0", () => {
      assert.deepEqual( stack.top, 0, "Top is not initialized to 0" );
    } );

    it( "Should return isEmpty === true", () => {
      assert.deepEqual( stack.isEmpty(), true, "isEmpty did not return true" );
    } );

    it( "Should throw error calling pop", () => {
      try {
        stack.pop();
      } catch ( err ) {
        assert.equal( err.message, "Stack underflow", "Error message incorrect" );
      }
    } );
  } );

  describe( "Operations", () => {
    it( "Should not push invalid data", () => {
      try {
        stack.push( undefined );
      } catch ( err ) {
        assert.equal( err.message, "Undefined data cannot be inserted into stack", "Error message incorrect" );
      }
    } );

    it( "Should push element", () => {
      assert.isUndefined( stack.push( 1 ), "Call to push threw error" );
    } );

    it( "Should update top to 1", () => {
      assert.deepEqual( stack.getTop(), 1, "Top not updated" );
    } );

    it( "Should return stack with length 1", () => {
      assert.equal( stack.getStack().length, 1, "Stack length incorrect" );
    } );

    it ("Should return element at top of stack", () => {
      assert.deepEqual( stack.getTop(), 1, "Returned incorrect element" );
    });

    it( "Should pop element and return it", () => {
      assert.deepEqual( stack.pop(), 1, "Incorrect result returned" );
    } );

    it( "Should update top to 0", () => {
      assert.deepEqual( stack.top, 0, "Top not updated" );
    } );
  } );
} );
