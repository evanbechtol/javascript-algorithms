const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const BST = require( "./bst" );

describe( "BST", () => {
  const BstInstance = new BST();

  describe( "Initialization", () => {
    it( "Create instance of BST class", () => {
      assert.isDefined( BstInstance, "BstInstance is undefined" );
    } );

    it( "Should have property 'tree'", () => {
      assert.isNotNull( BstInstance.tree, "Tree is null" );
    } );

    it( "Should have null root", () => {
      assert.isNull( BstInstance.tree.root, "Root is not null" );
    } );

    it( "Should have size of 0", () => {
      assert.equal( BstInstance.tree.size, 0, "Tree size is not 0" );
    } );
  } );

  describe( "Exposed methods", () => {
    it( "insert", () => {
      assert.isFunction( BstInstance.insert, "Method insert does not exist" );
    } );

    it( "delete", () => {
      assert.isFunction( BstInstance.delete, "Method delete does not exist" );
    } );

    it( "transplant", () => {
      assert.isFunction( BstInstance.transplant, "Method transplant does not exist" );
    } );

    it( "minDepth", () => {
      assert.isFunction( BstInstance.minDepth, "Method minDepth does not exist" );
    } );

    it( "maxDepth", () => {
      assert.isFunction( BstInstance.maxDepth, "Method maxDepth does not exist" );
    } );

    it( "isBalanced", () => {
      assert.isFunction( BstInstance.isBalanced, "Method isBalanced does not exist" );
    } );

    it( "inOrderWalk", () => {
      assert.isFunction( BstInstance.tree.inOrderWalk, "Method inOrderWalk does not exist" );
    } );

    it( "preOrderWalk", () => {
      assert.isFunction( BstInstance.tree.preOrderWalk, "Method preOrderWalk does not exist" );
    } );

    it( "postOrderWalk", () => {
      assert.isFunction( BstInstance.tree.postOrderWalk, "Method postOrderWalk does not exist" );
    } );
  } );

  describe( "Inorder Tree Walk", () => {
    it( "Should return in tree in order", () => {
      assert.deepEqual();
    } );
  } );
} );
