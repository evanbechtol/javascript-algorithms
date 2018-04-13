const TreeNode = require( './tree-node.js' ),
      BST      = require( './binary-search-tree' ),
      util     = require( '../../util/index' );

function AVL ( bst = new BST() ) {
  this.tree = bst.tree;
}

AVL.prototype.heightDifference = function ( node ) {
  return node.leftHeight() - node.rightHeight();
  //return this.maxDepth( left ) - this.maxDepth( right );
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
  } else if ( this.compareTo( node.key, root.key ) < 0 ) {
    /*
     * Recurse down the left subtree, check for an imbalance, if imbalance found
     * then determine which rotation to apply
     */
    root.left = this._insert( node, root.left );
    /*if ( this.heightDifference( root.left, root.right ) >= 2 ) {
      if ( node.key < root.left.key ) {
        root = this.rotateWithLeftChild( root );
      } else {
        root = this.doubleRotateWithLeftChild( root );
      }
    }*/
  } else if ( node.key > root.key ) {
    /*
     * Recurse down the right subtree, check for an imbalance, if imbalance found
     * then determine which rotation to apply
     */
    root.right = this._insert( node, root.right );
    /*if ( this.heightDifference( root.left, root.right ) >= 2 ) {
      if ( this.compareTo( node.key, root.key ) > 0 ) {
        root = this.rotateWithRightChild( root );
      } else {
        root = this.doubleRotateWithRightChild( root );
      }
    }*/
  } else {
    // Duplicate key
    this.tree.size--;
  }

  // Update height and re-balance
  root.height = Math.max( this.maxDepth( root.left ), this.maxDepth( root.right ) ) + 1;
  let heightDifference = this.heightDifference( root );

  return root;
};

/**
 * @description Rotate BST node with left child
 * @param node {TreeNode} Instance of TreeNode object to use in rotation
 */
/*AVL.prototype.rotateWithLeftChild = function ( node ) {
  let tempNode = node.left;

  node.left       = tempNode && tempNode.right ? tempNode.right : null;
  tempNode.right  = node;
  node.height     = Math.max( this.maxDepth( node.left ), this.maxDepth( node.right ) ) + 1;
  tempNode.height = Math.max( this.maxDepth( tempNode.left ), this.maxDepth( node.height ) ) + 1;
  return tempNode;
};*/

/**
 * @description Double Rotate BST node: first left child, with its right child.
 *   Then node k3 with new left child.
 * @param node {TreeNode} Instance of TreeNode object to use in rotation
 */
/*AVL.prototype.doubleRotateWithLeftChild = function ( node ) {
  node.left = this.rotateWithRightChild( node.left );
  return this.rotateWithLeftChild( node );
};*/

/**
 * @description Rotate BST node with right child
 * @param node {TreeNode} Instance of TreeNode object to use in rotation
 */
/*AVL.prototype.rotateWithRightChild = function ( node ) {
  let tempNode = node.right;

  node.right      = tempNode && tempNode.left ? tempNode.left : null;
  tempNode.left   = node;
  node.height     = Math.max( this.maxDepth( node.left ), this.maxDepth( node.right ) ) + 1;
  tempNode.height = Math.max( this.maxDepth( tempNode.left ), this.maxDepth( node.height ) ) + 1;
  return tempNode;
};*/

/**
 * @description Double rotate BST node: first right child with its left child.
 *   Then node k1 with new right child.
 * @param node {TreeNode} Instance of TreeNode object to use in rotation
 */
/*AVL.prototype.doubleRotateWithRightChild = function ( node ) {
  node.right = this.rotateWithLeftChild( node.right );
  return this.rotateWithRightChild( node );
};*/


/**
 * @description Determines the minimum depth of a binary tree node.
 * @param {TreeNode} node The node to check.
 * @return {int} The minimum depth of a binary tree node.
 */
/*AVL.prototype.minDepth = function ( node ) {
  return node ? 1 + Math.min( this.minDepth( node.left ), this.minDepth( node.right ) ) : 0;
};*/

/**
 * @description Determines the maximum depth of a binary tree node.
 * @param {TreeNode} node The node to check.
 * @return {int} The maximum depth of a binary tree node.
 */
AVL.prototype.maxDepth = function ( node ) {
  return node ? 1 + Math.max( this.maxDepth( node.left ), this.maxDepth( node.right ) ) : 0;
};


/**
 * @description Compares keys of TreeNodes
 * @param a {int} Key from first TreeNode to compare
 * @param b {int} Key from second TreeNode to compare
 * @returns {number} Returns 1 if a > b, -1 if a < b, and 0 if a === b
 */
AVL.prototype.compareTo = function ( a, b ) {
  return a > b ? 1 : a < b ? -1 : 0;
};

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
