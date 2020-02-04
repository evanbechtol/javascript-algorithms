const TreeNode = require( "../tree-node.js" );
const BST = require( "../BST/bst" );
const BalanceState = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
};

/**
 * @description AVL Trees are a type of BST, which abides by the following
 *   properties:
 *   - Abides by all the properties of a BST (Binary Search Tree)
 *   - The heights of the left and right subtrees of any node differ by no more
 *   than 1
 *
 *   AVL trees maintain a worst-case height of O(log N). All of the following
 *   operations also have a worst-case time complexity of O(log N): search,
 *   insert, delete. When an imbalance of the subtree heights is detected,
 *   rotations are performed on the node's subtree with the following cases:
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
 * @description Calculate the height difference between the left and right
 *   subtrees
 * @param node {object} Node to calculate the height difference for subtrees
 * @returns {number} Returns the height difference between the left and right
 *   subtrees
 */
AVL.prototype.heightDifference = function ( node ) {
  return Math.abs( node.leftHeight() - node.rightHeight() );
};

/**
 * @public
 * @description Attempts to insert the node into the AVL Tree, performs
 *   rotations when necessary
 * @param node {object} Instance of the object object to insert into the AVL
 *   tree
 * @returns {object} Returns new root node for AVL Tree
 */
AVL.prototype.insert = function ( node ) {
  this.tree.root = this._insert( node, this.tree.root );
  this.tree.size++;
  return node;
};

/**
 * @private
 * @description Attempts to insert the node into the AVL Tree, performs
 *   necessary rotations when necessary
 * @param root {object} Root node of subtree, defaults to root of AVL tree
 * @param node {object} Instance of the object object to insert into the AVL
 *   tree
 * @returns {object} Returns new root node for AVL Tree
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
    // Duplicate key, reduce size to account for increment in insert method
    this.tree.size--;
  }

  // Update height and re-balance
  return this.balance( node, root );
};

/**
 * @public
 * @description Attempts to delete the node with key from the AVL Tree,
 *   performs rotations when necessary
 * @param key {*} Key of the node to delete. Data type must match that of the
 *   key for the node
 * @returns {Object} Returns key of the node that was deleted from the tree
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
 * @param root {object} Root of the subtree to search through
 * @returns {object} Returns the new subtree root, after any deletions/rotations
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
      const successor = this.tree.minimum( root.right );
      root.key = successor.key;
      root.data = successor.data;
      root.right = this._delete( successor.key, root.right );
    }
  }

  if ( !root ) {
    return root;
  }

  // Update height and balance tree
  return this.deleteBalance( root );
};

/**
 * @description Performs the necessary rotations in order to balance the subtree
 * @param node {object} Node that is either inserted or deleted from subtree
 * @param root {object} Root node of the subtree
 * @returns {object} Returns the new root of the subtree after rotations
 */
AVL.prototype.balance = function ( node, root ) {
  root.height = root.getMaxHeight( root.leftHeight(), root.rightHeight() );
  const balanceState = getBalanceState( root );

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
 * @param root {object} Root of subtree
 * @returns {object} Returns the new root node after rotations
 */
AVL.prototype.deleteBalance = function ( root ) {
  root.height = Math.max( root.leftHeight(), root.rightHeight() ) + 1;
  const balanceState = getBalanceState( root );

  if ( balanceState === BalanceState.UNBALANCED_LEFT ) {
    let leftBalanceState = getBalanceState( root.left );
    // Case 1
    if ( leftBalanceState === BalanceState.BALANCED ||
      leftBalanceState === BalanceState.SLIGHTLY_UNBALANCED_LEFT ) {
      return root.rotateWithLeftChild();
    }
    // Case 2
    if ( leftBalanceState === BalanceState.SLIGHTLY_UNBALANCED_RIGHT ) {
      return root.doubleRotateLeft();
    }
  }

  if ( balanceState === BalanceState.UNBALANCED_RIGHT ) {
    let rightBalanceState = getBalanceState( root.right );
    // Case 4
    if ( rightBalanceState === BalanceState.BALANCED ||
      rightBalanceState === BalanceState.SLIGHTLY_UNBALANCED_RIGHT ) {
      return root.rotateWithRightChild();
    }
    // Case 3
    if ( rightBalanceState === BalanceState.SLIGHTLY_UNBALANCED_LEFT ) {
      return root.doubleRotateRight();
    }
  }

  return root;
};

/**
 * @description Compares keys of objects
 * @param a {int} Key from first object to compare
 * @param b {int} Key from second object to compare
 * @returns {number} Returns 1 if a > b, -1 if a < b, and 0 if a === b
 */
AVL.prototype.compare = function ( a, b ) {
  return a - b;
};

/**
 * @private
 * @description Gets the balance state of a node, indicating whether the left
 *   or right sub-trees are unbalanced.
 * @param {object} node The node to get the difference from.
 * @return {int} The BalanceState of the node.
 */
function getBalanceState ( node ) {
  const heightDifference = node.leftHeight() - node.rightHeight();
  return heightDifference === -2
    ? BalanceState.UNBALANCED_RIGHT
    : heightDifference === 2
      ? BalanceState.UNBALANCED_LEFT : 0;
}

module.exports = AVL;
