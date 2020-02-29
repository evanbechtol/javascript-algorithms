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
  } );

  describe( "Initialization", () => {
    it( "Should have null head", () => {
      assert.isNull( list.head, "list.head is not null" );
    } );

    it( "Should have size of 0", () => {
      assert.equal( list.size, 0, "List does not have size 0" );
    } );
  } );
} );
