const TreeNode = require( './tree-node.js' ),
      Tree     = require( './tree' ),
      util     = require( '../util' );

/**
 * @description Creates a new instance of a BST (Binary Search Tree) object
 * @param tree {object} Optional parameter. Can either pass an existing tree, or if omitted creates a new empty tree
 * @constructor
 */
function BST ( tree = new Tree() ) {
  this.tree = tree;
}

/**
 * @description Inserts a TreeNode object into the tree, in the proper position following BST properties
 * @param node {object} Instance of TreeNode object
 * @returns {*} Returns the inserted node
 */
BST.prototype.insert = function ( node ) {
  let parent  = null,
      current = this.tree.root;

  while ( current !== null ) {
    parent  = current;
    current = node.key < current.key ? current.left : current.right;
  }

  node.parent = parent;
  if ( parent === null ) {
    this.tree.root = node; // Tree was empty
  } else if ( node.key < parent.key ) {
    parent.left = node; // Insert left child
  } else {
    parent.right = node; // Insert right child
  }

  return node;
};

/**
 * @description Attempts to delete the node from the tree provided.
 * @param node {object} Instance of TreeNode object
 * @returns {*} Returns deleted node if node was found and deleted, otherwise returns null
 */
BST.prototype.delete = function ( node ) {
  if ( node ) {
    if ( node.left === null ) {
      if ( node.left === null ) {
        this.transplant( node, node.right );
      }
    } else if ( node.right === null ) {
      this.transplant( node, node.right );
    } else {
      let min = this.tree.minimum( node.right );

      if ( min.parent !== node ) {
        this.transplant( min, min.right );
        min.right        = node.right;
        min.right.parent = min;
      }

      this.transplant( node, min );
      min.left        = node.left;
      min.left.parent = min;
    }
    return node;
  }
  return null;
};

/**
 * @description Transplants a subtree to a new parent. This is used when deleting nodes, and rearranging the BST
 * @param subtreeA {object} Instance of TreeNode object
 * @param subtreeB {object} Instance of TreeNode object
 */
BST.prototype.transplant = function ( subtreeA, subtreeB ) {
  if ( subtreeA.parent === null ) {
    this.tree.root = subtreeB;
  } else if ( subtreeA === subtreeA.parent.left ) {
    subtreeA.parent.left = subtreeB;
  } else {
    subtreeA.parent.right = subtreeB;
  }
};

function main () {
  let bst           = new BST(),
      nodesToInsert = 8;

  console.log( '---Build the BST---');
  for ( let i = 0; i < nodesToInsert; i++ ) {
    let newNode = new TreeNode( null, null, null, util.randomNumber( 20, 1 ), util.randomNumber( 1000, 0 ) );
    console.log( `Inserted node with key : ${bst.insert( newNode ).key }` );
  }

  let nodeToDelete            = bst.tree.minimum(),
      successorOfNodeToDelete = bst.tree.successor( nodeToDelete );

  console.log( '---Tree Walking---');
  console.log( `Performing In order Walk of tree:` );
  console.log( bst.tree.inOrderWalk() );

  console.log( `Performing Pre order Walk of tree:` );
  console.log( bst.tree.preOrderWalk() );

  console.log( `Performing Post order Walk of tree:` );
  console.log( bst.tree.postOrderWalk() );

  console.log('---Method Testing---');
  console.log( `Search for  node with key ${nodeToDelete.key} : ${bst.tree.get( nodeToDelete.key ) ? 'Node found' : 'Node not found'}` );
  console.log( `Successor of ${nodeToDelete.key} is node ${successorOfNodeToDelete.key}` );
  console.log( `Parent  of ${successorOfNodeToDelete.key} is node ${successorOfNodeToDelete.parent ? successorOfNodeToDelete.parent.key : 'null'}` );
  console.log( `Deleted node with key : ${bst.delete( nodeToDelete ) ? `Node with key ${nodeToDelete.key} deleted` : `Node with key ${nodeToDelete.key} not deleted`}` );
  console.log( `Search for node with key ${nodeToDelete.key} : ${bst.tree.get( nodeToDelete.key ) ? 'Node found' : 'Node not found'}` );
  console.log( `Deleting root node : ${bst.delete( bst.tree.root ) ? `Root node deleted` : `Root node not deleted`}` );
  console.log( `New root node is: ${bst.tree.root.key}` );
  console.log( `Minimum value in tree is: ${bst.tree.minimum().key}` );
  console.log( `Maximum value in tree is: ${bst.tree.maximum().key}` );
  console.log( bst.tree.inOrderWalk() );
}

main();
