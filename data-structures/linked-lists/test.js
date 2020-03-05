const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const LinkedList = require( "./linkedList" );
const Node = require( "./node" );

describe( "Node", () => {
  const node = new Node();

  describe( "Initialization", () => {
    it( "Should have undefined data", () => {
      assert.isUndefined( node.data, "node.data is not undefined" );
    } );

    it( "Should have null next", () => {
      assert.isNull( node.next, 0, "node.next is not null" );
    } );

    it( "Should have undefined key", () => {
      assert.isUndefined( node.key, "node.key is not undefined" );
    } );
  } );
} );

describe( "LinkedList", () => {
  // Create instance of class for our test
  const list = new LinkedList();

  // Todo: test dataIsValid
  // Todo: test isIndexValid
  // Todo: test isKeyValid
  // Todo: test isEmpty
  // Todo: test indexOf
  // Todo: test sizeOfList
  // Todo: test toString

  describe( "Interface", () => {
    it( "add", () => {
      assert.isFunction( list.add, "Method 'add' does not exist" );
    } );

    it( "insertAt", () => {
      assert.isFunction( list.insertAt, "Method 'insertAt' does not exist" );
    } );

    it( "removeFrom", () => {
      assert.isFunction( list.removeFrom, "Method 'removeFrom' does not exist" );
    } );

    it( "removeElementWithKey", () => {
      assert.isFunction( list.removeElementWithKey, "Method 'removeElementWithKey' does not exist" );
    } );

    it( "isEmpty", () => {
      assert.isFunction( list.isEmpty, "Method 'isEmpty' does not exist" );
    } );

    it( "dataIsValid", () => {
      assert.isFunction( list.dataIsValid, "Method 'dataIsValid' does not exist" );
    } );

    it( "isIndexInvalid", () => {
      assert.isFunction( list.isIndexInvalid, "Method 'isIndexInvalid' does not exist" );
    } );

    it( "isKeyValid", () => {
      assert.isFunction( list.isKeyValid, "Method 'isKeyValid' does not exist" );
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

  describe( "Methods", () => {
    describe( "add", () => {
      it( "Should throw error with null or defined key", () => {
        try {
          list.add( null, null );
        } catch ( err ) {
          assert.equal( err.message, "Key cannot be null or undefined", "Error message incorrect" );
        }
      } );

      it( "Should throw error with null or defined data", () => {
        try {
          list.add( 1, null );
        } catch ( err ) {
          assert.equal( err.message, "Element cannot be null or undefined", "Error message incorrect" );
        }
      } );

      it( "Should have size of 0", () => {
        assert.equal( list.size, 0, "List does not have size 0" );
      } );

      it( "Should not throw error with defined data", () => {
        const data = { a: 1, b: "abc", c: [ 1, 2, 3 ] };
        list.add( 1, data );
        assert.equal( list.size, 1, "Size does not equal 1" );
      } );

      it( "Should have inserted node as head", () => {
        assert.equal( list.head.key, 1, "Node was not inserted as head" );
      } );

      it( "Should have head.next === null", () => {
        assert.isNull( list.head.next, "list.head.next is not null" );
      } );

      it( "Should have size === 1", () => {
        assert.equal( list.size, 1, "list.size is not 1" );
      } );
    } );

    describe( "insertAt", () => {
      it( "Should throw error when index is not a number", () => {
        try {
          const data = { a: 3, b: "acde", c: [ 5, 6, 7 ] };
          list.insertAt( data, "1" );
        } catch ( err ) {
          assert.equal( err.message, "Invalid index provided", "Error message incorrect" );
        }
      } );

      it( "Should throw error when index is less than 0", () => {
        try {
          const data = { a: 3, b: "acde", c: [ 5, 6, 7 ] };
          list.insertAt( data, -1 );
        } catch ( err ) {
          assert.equal( err.message, "Invalid index provided", "Error message incorrect" );
        }
      } );

      it( "Should throw error when index is greater than size", () => {
        try {
          const data = { a: 3, b: "acde", c: [ 5, 6, 7 ] };
          list.insertAt( data, 1000 );
        } catch ( err ) {
          assert.equal( err.message, "Invalid index provided", "Error message incorrect" );
        }
      } );

      it( "Should throw error when data is null", () => {
        try {
          const data = null;
          list.insertAt( -1, data, 0 );
        } catch ( err ) {
          assert.equal( err.message, "Element cannot be null or undefined", "Error message incorrect" );
        }
      } );

      it( "Should throw error when data is undefined", () => {
        try {
          const data = undefined;
          list.insertAt( -1, data, 0 );
        } catch ( err ) {
          assert.equal( err.message, "Element cannot be null or undefined", "Error message incorrect" );
        }
      } );

      it( "Should insert node as head when index is 0", () => {
        const data = { a: 5, b: "acdddde", c: [ 5, 6, 7 ] };
        list.insertAt( 2, data, 0 );
        assert.equal( list.head.data.a, 5, "Incorrect node as head" );
      } );

      it( "Should have size === 2", () => {
        assert.equal( list.size, 2, "list.size is not 2" );
      } );

      it( "Should insert node between two nodes", () => {
        const data = { a: 6, b: "test", c: [ 5, 6, 7 ] };
        list.insertAt( 3, data, 1 );
        const isValid = list.head.next.data.a === 6 && list.head.next.next.data.a === 1;
        assert.equal( isValid, true, "Node not inserted in correct position" );
      } );
    } );

    describe( "removeFrom", () => {
      it( "Should throw error when index is not a number", () => {
        try {
          list.removeFrom( "1" );
        } catch ( err ) {
          assert.equal( err.message, "Invalid index provided", "Error message incorrect" );
        }
      } );

      it( "Should throw error when index is less than 0", () => {
        try {
          list.removeFrom( -1 );
        } catch ( err ) {
          assert.equal( err.message, "Invalid index provided", "Error message incorrect" );
        }
      } );

      it( "Should throw error when index is greater than size", () => {
        try {
          list.removeFrom( 1000 );
        } catch ( err ) {
          assert.equal( err.message, "Invalid index provided", "Error message incorrect" );
        }
      } );

      let deletedElement;

      it( "Should return the removed element", () => {
        deletedElement = list.removeFrom( 1 );
        assert.equal( deletedElement.data.a, 6, "Incorrect element returned" );
      } );

      it( "Should update the previous node's next property", () => {
        assert.equal( list.head.next.data.a, 1, "Incorrect node was set as next node" );
      } );

      it( "Should have size === 2", () => {
        assert.equal( list.size, 2, "Size is incorrect" );
      } );

      it( "Should remove the head node", () => {
        deletedElement = list.removeFrom( 0 );
        assert.equal( deletedElement.data.a, 5, "Incorrect element returned" );
      } );

      it( "Should have size === 1", () => {
        assert.equal( list.size, 1, "Size is incorrect" );
      } );
    } );

    describe( "removeElementWithKey", () => {
      it( "Should throw error when key is undefined", () => {
        try {
          list.removeElementWithKey( undefined );
        } catch ( err ) {
          assert.equal( err.message, "Key cannot be null or undefined", "Error message incorrect" );
        }
      } );

      it( "Should throw error when key is null", () => {
        try {
          list.removeElementWithKey( null );
        } catch ( err ) {
          assert.equal( err.message, "Key cannot be null or undefined", "Error message incorrect" );
        }
      } );

      let deletedElement;

      it( "Should return the removed element", () => {
        deletedElement = list.removeElementWithKey( 1 );
        assert.equal( deletedElement.key, 1, "Incorrect element returned" );
      } );

      it( "Should have size === 0", () => {
        assert.equal( list.size, 0, "Size is incorrect" );
      } );

      it( "Should return null if key is not found", () => {
        assert.isNull( list.removeElementWithKey( 1000 ), "Incorrect return value" );
      } );
    } );
  } );
} );
