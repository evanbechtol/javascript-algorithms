const AVLTreeNode = require( './avl-tree-node.js' ),
      BST         = require( './binary-search-tree' ),
      util        = require( '../../util/index' );

function AVL ( bst = new BST() ) {
  this.tree   = bst.tree;
}

/**
 * @description
 * @param root {AVLTreeNode} Root node of subtree, defaults to root of AVL tree
 * @param node {AVLTreeNode} Instance of the AVLTreeNode object to insert into the AVL tree
 */
AVL.prototype.insert = function ( node, root = this.root ) {
  if ( !root ) {
    root = new AVLTreeNode();
  } else if ( node.key < root.key ) {
    /*
     * Recurse down the left subtree, check for an imbalance, if imbalance found
     * then determine which rotation to apply
     */
    root.left = this.insert( node, root.left );
    if ( this.maxDepth( root.left ) - this.maxDepth( root.right ) === 2 ) {
      if ( node < root.left.key ) {
        root = this.rotateWithLeftChild( root );
      } else {
        root = this.doubleRotateWithLeftChild( root );
      }
    }
  } else if ( node.key > root.key ) {
    /*
     * Recurse down the right subtree, check for an imbalance, if imbalance found
     * then determine which rotation to apply
     */
    if ( this.maxDepth( root.right ) - this.maxDepth( root.left ) === 2 ) {
      if ( node > root.right.key ) {
        root = this.rotateWithRightChild( root );
      } else {
        root = this.doubleRotateWithRightChild( root );
      }
    }
  } else {
    // Duplicate key; do nothing
  }

  root.height = Math.max( this.maxDepth( root.left ), this.maxDepth( root.right ) ) + 1;
  return root;
};

/**
 * @description Rotate BST node with left child
 * @param node {AVLTreeNode} Instance of AVLTreeNode object to use in rotation
 */
AVL.prototype.rotateWithLeftChild = function ( node ) {

  let leftNode = node.left,
      tempNode = new AVLTreeNode( leftNode.parent, leftNode.left, leftNode.right, leftNode.key );

  tempNode.right  = node;
  node.height     = Math.max( this.maxDepth( node.left ), this.maxDepth( node.right ) ) + 1;
  tempNode.height = Math.max( this.maxDepth( tempNode.left ), this.maxDepth( node.height ) ) + 1;
  return tempNode;
};

/**
 * @description Double Rotate BST node: first left child, with its right child.
 *   Then node k3 with new left child.
 * @param node {AVLTreeNode} Instance of AVLTreeNode object to use in rotation
 */
AVL.prototype.doubleRotateWithLeftChild = function ( node ) {
  node.left = this.rotateWithRightChild( node.left );
  return this.rotateWithLeftChild( node );
};

/**
 * @description Rotate BST node with right child
 * @param node {AVLTreeNode} Instance of AVLTreeNode object to use in rotation
 */
AVL.prototype.rotateWithRightChild = function ( node ) {
  let tempNode = node.right;

  node.right      = tempNode.left;
  tempNode.left   = node;
  node.height     = Math.max( this.maxDepth( node.left ), this.maxDepth( node.right ) ) + 1;
  tempNode.height = Math.max( this.maxDepth( tempNode.left ), this.maxDepth( node.height ) ) + 1;
  return tempNode;
};

/**
 * @description Double rotate BST node: first right child with its left child.
 *   Then node k1 with new right child.
 * @param node {AVLTreeNode} Instance of AVLTreeNode object to use in rotation
 */
AVL.prototype.doubleRotateWithRightChild = function ( node ) {
  node.right = this.rotateWithLeftChild( node.right );
  return this.rotateWithRightChild( node );
};
