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
 * @description Attempts to insert the node into the AVL Tree, performs rotations when necessary
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
  return this.balance( node, root );
};

/**
 * @public
 * @description Attempts to delete the node with key fromthe AVL Tree, performs rotations when necessary
 * @param key {*} Key of the node to delete. Data type must match that of the key for the node
 * @returns {TreeNode} Returns key of the node that was deleted from the tree
 */
AVL.prototype.delete = function ( key ) {
  this.tree.root = this._delete( key, this.tree.root );
  this.tree.size--;
  return key;
};

/**
 * @description Attempts to delete the node from the subtree. Afterwards, the
 *   subtree is rebalanced in the outward flow of recursion.
 * @param key {*} Key for the node that is to be deleted
 * @param root {TreeNode} Root of the subtree to search through
 * @returns {TreeNode} Returns the new subtree root, after any deletions/rotations
 * @private
 */
AVL.prototype._delete = function ( key, root ) {
  if ( !root ) {
    // Account for the decrement in size; no node found
    this.tree.size++;
    return root;
  }

  if ( this.compare( key, root.key ) < 0 ) {
    // Recurse down the left subtree for deletion
    root.left = this._delete( key, root.left );
  } else if ( this.compare( key, root.key ) > 0 ) {
    // Recurse down the right subtree for deletion
    root.right = this._delete( key, root.right );
  } else {
    // Key matches the root of this subtree
    if ( !( root.left || root.right ) ) {
      // This is a leaf node, and deletion is trivial
      root = null;
    } else if ( !root.left && root.right ) {
      // Node only has a right leaf
      root = root.right;
    } else if ( root.left && !root.right ) {
      // Node only has a left leaf
      root = root.left;
    } else {
      /*
       * Node has 2 children. To delete this node, a successor must be determined.
       * Successor is:
       *   1) Smallest key in the right subtree
       *   2) Largest key in the left subtree
       */
      let successor = this.tree.minimum( root.right );
      root.key      = successor.key;
      root.data     = successor.data;
      root.right    = this._delete( successor.key, root.right );
    }
  }

  if ( !root ) {
    return root;
  }

  root.height      = Math.max( root.leftHeight(), root.rightHeight() ) + 1;
  return this.deleteBalance( root );
};

/**
 * @description Performs the necessary rotations in order to balance the subtree
 * @param node {TreeNode} Node that is either inserted or deleted from subtree
 * @param root {TreeNode} Root node of the subtree
 * @returns {TreeNode} Returns the new root of the subtree after rotations
 */
AVL.prototype.balance = function ( node, root ) {
  root.height      = root.getMaxHeight( root.leftHeight(), root.rightHeight() );
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
 * @description
 * @param root {TreeNode} Root of subtree
 * @returns {TreeNode} Returns the new root node after rotations
 */
AVL.prototype.deleteBalance = function ( root ) {
  let balanceState = getBalanceState( root );
  if ( balanceState === BalanceState.UNBALANCED_LEFT ) {
    // Case 1
    if ( getBalanceState( root.left ) === BalanceState.BALANCED ||
        getBalanceState( root.left ) === BalanceState.SLIGHTLY_UNBALANCED_LEFT ) {
      return root.rotateWithLeftChild();
    }
    // Case 2
    if ( getBalanceState( root.left ) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT ) {
      return root.doubleRotateLeft();
    }
  }

  if ( balanceState === BalanceState.UNBALANCED_RIGHT ) {
    // Case 4
    if ( getBalanceState( root.right ) === BalanceState.BALANCED ||
        getBalanceState( root.right ) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT ) {
      return root.rotateWithRightChild();
    }
    // Case 3
    if ( getBalanceState( root.right ) === BalanceState.SLIGHTLY_UNBALANCED_LEFT ) {
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
  UNBALANCED_RIGHT          : 1,
  SLIGHTLY_UNBALANCED_RIGHT : 2,
  BALANCED                  : 3,
  SLIGHTLY_UNBALANCED_LEFT  : 4,
  UNBALANCED_LEFT           : 5
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
      nodesToInsert = 1000;

  for ( let i = 0; i < nodesToInsert; i++ ) {
    let newNode = new TreeNode( null, null, null, util.randomNumber( Number.MAX_SAFE_INTEGER, 1 ), util.randomNumber( 1000, 0 ) );
    //console.log( `Inserted node with key : ${avl.insert( newNode ).key }` );
    avl.insert( newNode );
  }
  /* console.log( avl.tree.preOrderWalk() );
   console.log( avl.tree.postOrderWalk() );*/
  console.log( `Number of nodes in tree ${avl.tree.size}` );
  console.log( `Tree balance: ${avl.heightDifference( avl.tree.root )}` );
  console.log( avl.insert( new TreeNode( null, null, null, 47584759392346, util.randomNumber( 1000, 0 ) ) ).key );
  //console.log( avl.tree.inOrderWalk() );
  let node = avl.tree.get( 47584759392346 );
  console.log( `Attempting to retrieve key 47584759392346: ${node ? 'Node found' : 'Node does not exist' }` );
  console.log( `Minimum key is ${avl.tree.minimum().key}, maximum is ${avl.tree.maximum().key}` );
  console.log( `Number of nodes in tree ${avl.tree.size}` );
  console.log( `Attempting to delete key 47584759392346 ${avl.delete( 47584759392346 )}` );
  node = avl.tree.get( 47584759392346 );
  console.log( `Attempting to retrieve key 47584759392346: ${node ? 'Node found' : 'Node does not exist' }` );
  console.log( `Tree balance: ${avl.heightDifference( avl.tree.root )}` );
  console.log( `Number of nodes in tree ${avl.tree.size}` );

}

main();
