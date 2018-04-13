const TreeNode = require( './tree-node.js' ),
      BST      = require( './binary-search-tree' ),
      util     = require( '../../util/index' );

/**
 * @description AVL Trees are a type of BST, which abides by the following properties:
 *   - Abides by all the properties of a BST (Binary Search Tree)
 *   - The heights of the left and right subtrees of any node differ by no more than 1
 *
 *   AVL trees maintain a worst-case height of O(log N). All of the following operations
 *   also have a worst-case time complexity of O(log N): search, insert, delete.
 *   When an imbalance of the subtree heights is detected, rotations are performed on the node's
 *   subtree with the following cases:
 *
 *       Case: Where insertion took place     | Type of rotation
 *       ----------------------------------------------------------------
 *       1) Left subtree of left child of x   | rotateRight
 *       2) Right subtree of left child of x  | rotateLeft, then rotateRight
 *       3) Left subtree of right child of x  | rotateLeft
 *       4) Right subtree of right child of x | rotateRight, then rotateLeft
 * @param bst
 * @constructor
 */
function AVL ( bst = new BST() ) {
  this.tree = bst.tree;
}

/**
 * @description Calculate the height difference between the left and right subtrees
 * @param node {TreeNode} Node to calculate the height difference for subtrees
 * @returns {number} Returns the height difference between the left and right subtrees
 */
AVL.prototype.heightDifference = function ( node ) {
  return Math.abs( node.leftHeight() - node.rightHeight() );
};

/**
 * @public
 * @description Attempts to insert the node into the AVL Tree, performs necessary rotations when necessary
 * @param node {TreeNode} Instance of the TreeNode object to insert into the AVL tree
 * @returns {TreeNode} Returns new root node for AVL Tree
 */
AVL.prototype.insert = function ( node ) {
  this.tree.root = this._insert( node, this.tree.root );
  this.tree.size++;
  return node;
};

/**
 * @private
 * @description Attempts to insert the node into the AVL Tree, performs necessary rotations when necessary
 * @param root {TreeNode} Root node of subtree, defaults to root of AVL tree
 * @param node {TreeNode} Instance of the TreeNode object to insert into the AVL tree
 * @returns {TreeNode} Returns new root node for AVL Tree
 */
AVL.prototype._insert = function ( node, root = this.tree.root ) {
  if ( !root ) {
    // Insert the node
    root = new TreeNode( node.parent, node.left, node.right, node.key, node.data );
  } else if ( this.compare( node.key, root.key ) < 0 ) {
    // Recurse into left subtree
    root.left = this._insert( node, root.left );
  } else if ( node.key > root.key ) {
    // Recurse into right subtree
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
      // Rotation case 1
      root = root.rotateWithLeftChild();
    } else {
      // Rotation case 2
      return root.doubleRotateLeft();
    }
  }

  if ( balanceState === BalanceState.UNBALANCED_RIGHT ) {
    if ( this.compare( node.key, root.right.key ) > 0 ) {
      // Rotation case 4
      root = root.rotateWithRightChild();
    } else {
      // Rotation case 3
      return root.doubleRotateRight();
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

/**
 * @private
 * @description Used to determine tree balance state, and subsequently balance the tree
 *   Taken from (https://github.com/gwtw/js-avl-tree)
 * @type {{UNBALANCED_RIGHT: number, BALANCED: number, UNBALANCED_LEFT: number}}
 */
let BalanceState = {
  UNBALANCED_RIGHT : 1,
  BALANCED         : 3,
  UNBALANCED_LEFT  : 5
};

/**
 * @private
 * @description Gets the balance state of a node, indicating whether the left or right
 *   sub-trees are unbalanced. Taken from (https://github.com/gwtw/js-avl-tree)
 * @param {TreeNode} node The node to get the difference from.
 * @return {int} The BalanceState of the node.
 */
function getBalanceState ( node ) {
  let heightDifference = node.leftHeight() - node.rightHeight();
  return heightDifference === -2
      ? BalanceState.UNBALANCED_RIGHT
      : heightDifference === 2
          ? BalanceState.UNBALANCED_LEFT : 0;
}

function main () {
  let avl           = new AVL(),
      nodesToInsert = 100;

  for ( let i = 0; i < nodesToInsert; i++ ) {
    let newNode = new TreeNode( null, null, null, util.randomNumber( Number.MAX_SAFE_INTEGER, 1 ), util.randomNumber( 1000, 0 ) );
    //console.log( `Inserted node with key : ${avl.insert( newNode ).key }` );
    avl.insert( newNode );
  }
  /* console.log( avl.tree.preOrderWalk() );
   console.log( avl.tree.postOrderWalk() );*/
  console.log( `Number of nodes in tree ${avl.tree.size}` );
  console.log( `Tree balance: ${avl.heightDifference( avl.tree.root )}` );
  console.log( avl.insert( new TreeNode( null, null, null, 10, util.randomNumber( 1000, 0 ) ) ).key );
  console.log( avl.tree.inOrderWalk() );
  let node = avl.tree.get( 10 );
  console.log( `Attempting to retrieve key 10: ${node ? 'Node found' : 'Node does not exist' }` );
  console.log( `Minimum key is ${avl.tree.minimum().key}, maximum is ${avl.tree.maximum().key}` );
}

main();
