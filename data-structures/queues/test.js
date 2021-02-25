const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const Queue = require( "./index" );

describe( "Queues", () => {
  // Create instance of class for our test
  const queue = new Queue();

  describe( "Exposed methods", () => {
    it( "push", () => {
      assert.isFunction( queue.push, "Method 'push' does not exist" );
    } );

    it( "pop", () => {
      assert.isFunction( queue.pop, "Method 'pop' does not exist" );
    } );

    it( "isEmpty", () => {
      assert.isFunction( queue.isEmpty, "Method 'isEmpty' does not exist" );
    } );

    it( "getTop", () => {
      assert.isFunction( queue.getTop, "Method 'getTop' does not exist" );
    } );

    it( "getQueue", () => {
      assert.isFunction( queue.getQueue, "Method 'getQueue' does not exist" );
    } );
  } );

  describe( "Initialization", () => {
    it( "Should initialize empty array", () => {
      assert.deepEqual( queue.getQueue().length, 0, "Array does not have length 0" );
    } );

    it( "Should return isEmpty === true", () => {
      assert.deepEqual( queue.isEmpty(), true, "isEmpty did not return true" );
    } );

    it( "Should throw error calling pop", () => {
      try {
        queue.pop();
      } catch ( err ) {
        assert.equal( err.message, "Queue underflow", "Error message incorrect" );
      }
    } );
  } );

  describe( "Operations", () => {
    it( "Should not push invalid data", () => {
      try {
        queue.push( undefined );
      } catch ( err ) {
        assert.equal( err.message, "Undefined data cannot be inserted into queue", "Error message incorrect" );
      }
    } );

    it( "Should push element", () => {
      assert.isUndefined( queue.push( 1 ), "Call to push threw error" );
    } );

    it( "Should update top to 1", () => {
      assert.deepEqual( queue.getTop(), 1, "Top not updated" );
    } );

    it( "Should return queue with length 1", () => {
      assert.equal( queue.getQueue().length, 1, "Queue length incorrect" );
    } );

    it ("Should return element at top of queue", () => {
      assert.deepEqual( queue.getTop(), 1, "Returned incorrect element" );
    });

    it( "Should pop element and return it", () => {
      assert.deepEqual( queue.pop(), 1, "Incorrect result returned" );
    } );

    it( "Should be empty", () => {
      assert.deepEqual( queue.isEmpty(), true, "Queue is not empty and should be" );
    } );
  } );
} );
