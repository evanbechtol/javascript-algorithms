const TreeNode = require( './tree-node.js' ),
      BST      = require( './binary-search-tree' ),
      util     = require( '../../util/index' );

function AVL ( bst = new BST() ) {
  this.tree = bst.tree;
}

AVL.prototype.heightDifference = function ( node ) {
  return Math.abs( node.leftHeight() - node.rightHeight() );
};

AVL.prototype.insert = function ( node ) {
  this.tree.root = this._insert( node, this.tree.root );
  this.tree.size++;
  return node;
};

/**
 * @description Attempts to insert the node into the AVL Tree, performs necessary rotations when necessary
 * @param root {TreeNode} Root node of subtree, defaults to root of AVL tree
 * @param node {TreeNode} Instance of the TreeNode object to insert into the AVL tree
 * @returns {TreeNode} Returns new root node for AVL Tree
 */
AVL.prototype._insert = function ( node, root = this.tree.root ) {
  if ( !root ) {
    root = new TreeNode( node.parent, node.left, node.right, node.key, node.data );
  } else if ( this.compare( node.key, root.key ) < 0 ) {
    root.left = this._insert( node, root.left );
  } else if ( node.key > root.key ) {
    root.right = this._insert( node, root.right );
  } else {
    // Duplicate key
    this.tree.size--;
  }

  // Update height and re-balance
  root.height      = Math.max( root.leftHeight(), root.rightHeight() ) + 1;
  let balanceState = getBalanceState( root );

  if ( balanceState === BalanceState.UNBALANCED_LEFT ) {
    if ( this.compare( node.key, root.left.key ) < 0 ) {
      // Left left case
      root = root.rotateRight();
    } else {
      // Left right case
      root.left = root.left.rotateLeft();
      return root.rotateRight();
    }
  }

  if ( balanceState === BalanceState.UNBALANCED_RIGHT ) {
    if ( this.compare( node.key, root.right.key ) > 0 ) {
      // Right right case
      root = root.rotateLeft();
    } else {
      // Right left case
      root.right = root.right.rotateRight();
      return root.rotateLeft();
    }
  }

  return root;
};

/**
 * @description Compares keys of TreeNodes
 * @param a {int} Key from first TreeNode to compare
 * @param b {int} Key from second TreeNode to compare
 * @returns {number} Returns 1 if a > b, -1 if a < b, and 0 if a === b
 */
AVL.prototype.compare = function ( a, b ) {
  return a > b ? 1 : a < b ? -1 : 0;
};

let BalanceState = {
  UNBALANCED_RIGHT          : 1,
  SLIGHTLY_UNBALANCED_RIGHT : 2,
  BALANCED                  : 3,
  SLIGHTLY_UNBALANCED_LEFT  : 4,
  UNBALANCED_LEFT           : 5
};

/**
 * @private
 * @description Gets the balance state of a node, indicating whether the left or right
 *   sub-trees are unbalanced.
 * @param {TreeNode} node The node to get the difference from.
 * @return {int} The BalanceState of the node.
 */
function getBalanceState ( node ) {
  let heightDifference = node.leftHeight() - node.rightHeight();

  switch ( heightDifference ) {
    case -2:
      return BalanceState.UNBALANCED_RIGHT;
    case -1:
      return BalanceState.SLIGHTLY_UNBALANCED_RIGHT;
    case 1:
      return BalanceState.SLIGHTLY_UNBALANCED_LEFT;
    case 2:
      return BalanceState.UNBALANCED_LEFT;
    default:
      return BalanceState.BALANCED;
  }
}

function main () {
  let avl           = new AVL(),
      nodesToInsert = 10;

  for ( let i = 0; i < nodesToInsert; i++ ) {
    let newNode = new TreeNode( null, null, null, util.randomNumber( 20, 1 ), util.randomNumber( 1000, 0 ) );
    console.log( `Inserted node with key : ${avl.insert( newNode ).key }` );
  }
  console.log( avl.tree.inOrderWalk() );
  console.log( avl.tree.preOrderWalk() );
  console.log( avl.tree.postOrderWalk() );
  console.log( `Tree balance: ${avl.heightDifference( avl.tree.root )}` );
}

main();
