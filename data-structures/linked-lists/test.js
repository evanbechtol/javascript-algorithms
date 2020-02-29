const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const LinkedList = require( "./linkedList" );
const Node = require( "./node" );

describe( "Node", () => {
  const node = new Node();

  describe( "Initialization", () => {
    it( "Should have null data", () => {
      assert.isUndefined( node.data, "node.data is not null" );
    } );

    it( "Should have null next", () => {
      assert.isNull( node.next, 0, "node.next is not null" );
    } );
  } );
} );

describe( "LinkedList", () => {
  // Create instance of class for our test
  const list = new LinkedList();

  describe( "Exposed methods", () => {
    it( "add", () => {
      assert.isFunction( list.add, "Method 'add' does not exist" );
    } );

    it( "insertAt", () => {
      assert.isFunction( list.insertAt, "Method 'insertAt' does not exist" );
    } );
  } );

  describe( "Initialization", () => {
    it( "Should have null head", () => {
      assert.isNull( list.head, "list.head is not null" );
    } );

    it( "Should have size of 0", () => {
      assert.equal( list.size, 0, "List does not have size 0" );
    } );
  } );

  describe( "Add", () => {
    it( "Should throw error with null or defined data", () => {
      try {
        list.add( null );
      } catch ( err ) {
        assert.equal( err.message, "Element cannot be null or undefined", "Error message incorrect" );
      }
    } );

    it( "Should have size of 0", () => {
      assert.equal( list.size, 0, "List does not have size 0" );
    } );

    it( "Should not throw error with defined data", () => {
      const data = { a: 1, b: "abc", c: [ 1, 2, 3 ] };
      list.add( data );
      assert.equal( list.size, 1, "Size does not equal 1" );
    } );

    it( "Should have inserted node as head", () => {
      assert.equal( list.head.data.a, 1, "Node was not inserted as head" );
    } );

    it( "Should have head.next === null", () => {
      assert.isNull( list.head.next, "list.head.next is not null" );
    } );

    it( "Should have size === 1", () => {
      assert.equal( list.size, 1, "list.size is not 1" );
    } );
  } );
} );
