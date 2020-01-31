const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const BST = require( "./bst" );
const TreeNode = require( "../tree-node" );
const util = require( "../../../util" );

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

  describe( "Insert Nodes", () => {
    it( "Should return null for invalid node", () => {
      assert.deepEqual( BstInstance.insert( null ), null, "Insert did not return null as expected" );
    } );

    it( "Should return node for valid node", () => {
      const key = 4;
      const data = 10;

      const node = new TreeNode( null, null, null, key, data );
      assert.deepEqual( BstInstance.insert( node ), node, "Insert did not return node as expected" );
    } );

    it( "Should update tree size", () => {
      assert.equal( BstInstance.tree.size, 1, "Tree size is not 1" );
    } );

    it( "Should make inserted node root", () => {
      assert.equal( BstInstance.tree.root.key, 4, "Root key is not 4" );
    } );

    it( "Should have all required properties", () => {
      assert.containsAllKeys( BstInstance.tree.root, [ "parent", "key", "data", "left", "right" ], "Does not contain all required keys" );
    } );

    it( "Should have null left child", () => {
      assert.isNull( BstInstance.tree.root.left, "Left child is not null" );
    } );

    it( "Should have null right child", () => {
      assert.isNull( BstInstance.tree.root.right, "Left right is not null" );
    } );

    it( "Should have null parent", () => {
      assert.isNull( BstInstance.tree.root.parent, "Parent is not null" );
    } );

    it( "Should insert node as left child of root", () => {
      const key = 2;
      const data = 8;

      const node = new TreeNode( null, null, null, key, data );
      BstInstance.insert( node );
      assert.deepEqual( BstInstance.tree.root.left.key, key, "Insert did not place node as left child" );
    } );

    it( "Should insert node as right child of root", () => {
      const key = 6;
      const data = 7;

      const node = new TreeNode( null, null, null, key, data );
      BstInstance.insert( node );
      assert.deepEqual( BstInstance.tree.root.right.key, key, "Insert did not place node as right child" );
    } );
  } );

  describe( "isBalanced Method", () => {
    it( "Should be balanced", () => {
      assert.equal( BstInstance.isBalanced(), true, "isBalanced returned false" );
    } );
  } );

  describe( "In-order Walk", () => {
    it( "Should return tree in-order", () => {
      assert.deepEqual( BstInstance.tree.inOrderWalk(), [ 2, 4, 6 ], "inOrderWalk incorrect" );
    } );
  } );
} );
