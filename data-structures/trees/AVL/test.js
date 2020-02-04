const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const AVL = require( "./avl-tree" );
const TreeNode = require( "../tree-node" );
const util = require( "../../../util" );

describe( "AVL Tree", () => {
  let avl = new AVL();
  const nodesToInsert = 1000;

  it( "Should initialize as an empty tree", () => {
    assert.equal( avl.tree.size, 0, `Did not initialize properly` );
  } );

  it( `Should insert up to ${nodesToInsert} nodes`, () => {
    for ( let i = 0; i < nodesToInsert; i++ ) {
      let newNode = new TreeNode( null, null, null, util.randomNumber( Number.MAX_SAFE_INTEGER, 1 ), util.randomNumber( 1000, 0 ) );
      assert( avl.insert( newNode ), `Could not insert node ${newNode}` );
    }
  } );

  it( `Should have a size <= ${nodesToInsert}`, () => {
    assert.isAtLeast( avl.tree.size, nodesToInsert, `Did not insert correct number of nodes` );
  } );

  it( "Should be balanced", () => {
    assert.isBelow( avl.heightDifference( avl.tree.root ), 2, "Tree is unbalanced" );
  } );

  it( "Should ignore inserting a duplicate node", () => {
    const minNode = Object.assign( {}, avl.tree.get( avl.tree.minimum().key ) );
    const previousSize = avl.tree.size;

    minNode.data = "Attempting to replace node";
    avl.insert( minNode );

    assert.equal( avl.tree.size, previousSize, "Duplicate node was inserted" );
  } );

  it( "Should retrieve the minimum node in the tree", () => {
    assert.exists( avl.tree.minimum(), "Minimum node not retrieved" );
  } );

  it( "Should retrieve the maximum node in the tree", () => {
    assert.exists( avl.tree.maximum(), "Maximum node not retrieved" );
  } );

  it( "Should not delete a non-existent key", () => {
    const previousSize = avl.tree.size;
    const rootNode = avl.tree.root;

    avl.delete( Number.MIN_SAFE_INTEGER );
    assert.equal( avl.tree.size, previousSize, "Duplicate node was inserted" );
    assert.deepEqual( avl.tree.root, rootNode, "Root node changed unexpectedly" );
  } );


  it( "Should retrieve, and delete the minimum node, then update tree size", () => {
    const minNode = Object.assign( {}, avl.tree.get( avl.tree.minimum().key ) );
    const previousSize = avl.tree.size;

    assert.equal( avl.delete( minNode.key ), minNode.key, "Delete did not return the key of the minimum node" );
    assert.notExists( avl.tree.get( minNode.key ), "Minimum node was not deleted" );
    assert.equal( avl.tree.size, previousSize - 1, "Tree Size did not update after deletion" );
  } );

  it( "Should retrieve, and delete the maximum node, then update tree size", () => {
    const maxNode = Object.assign( {}, avl.tree.get( avl.tree.maximum().key ) );
    const previousSize = avl.tree.size;

    assert.equal( avl.delete( maxNode.key ), maxNode.key, "Delete did not return the key of the maximum node" );
    assert.notExists( avl.tree.get( maxNode.key ), "Maximum node was not deleted" );
    assert.equal( avl.tree.size, previousSize - 1, "Tree Size did not update after deletion" );
  } );

  it( "Should remain balanced after deleting node with 2 children", () => {
    const leftChildOfRoot = Object.assign( {}, avl.tree.root.left );
    const previousSize = avl.tree.size;

    avl.delete( leftChildOfRoot.key );
    assert.notExists( avl.tree.get( leftChildOfRoot.key ), "Left node was not deleted" );
    assert.equal( avl.tree.size, previousSize - 1, "Tree Size did not update after deletion" );
    assert.notDeepEqual( avl.tree.root.left, leftChildOfRoot, "Left child of root was not deleted" );
    assert.isBelow( avl.heightDifference( avl.tree.root ), 2, "Tree is unbalanced" );
  } );
} );
