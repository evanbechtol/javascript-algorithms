/**
 * @description Constructor to create an instance of the TreeNode object, which is used by the
 *   Tree object to construct various types of trees.
 * @param parent {object} Parent TreeNode object of the node
 * @param left {object} Left TreeNode object of the node
 * @param right {object} Right TreeNode object of the node
 * @param key {*} Identifier used to Retrieve a node
 * @param data {object} Can be any satellite data needed to be stored in the node
 * @constructor
 */
function TreeNode ( parent = null, left = null, right = null, key = null, data = null ) {
  this.parent = parent;
  this.left   = left;
  this.right  = right;
  this.key    = key;
  this.data   = data;
}

TreeNode.prototype.leftHeight = function () {
  return !this.left ? -1 : this.left.height;
};

TreeNode.prototype.rightHeight = function () {
  return !this.right ? -1 : this.right.height;
};

TreeNode.prototype.rotateRight = function () {
  let other    = this.left;
  this.left    = other.right;
  other.right  = this;
  this.height  = Math.max( this.leftHeight(), this.rightHeight() ) + 1;
  other.height = Math.max( other.leftHeight(), this.height ) + 1;
  return other;
};

/**
 * @description Rotate BST node with right child
 */
TreeNode.prototype.rotateLeft = function () {
  let other    = this.right;
  this.right   = other.left;
  other.left   = this;
  this.height  = Math.max( this.leftHeight(), this.rightHeight() ) + 1;
  other.height = Math.max( other.rightHeight(), this.height ) + 1;
  return other;
};

/**
 * @description Rotate BST node with left child
 */
TreeNode.prototype.rotateWithLeftChild = function ( node ) {
  let tempNode = node.left;

  node.left       = tempNode && tempNode.right ? tempNode.right : null;
  tempNode.right  = node;
  node.height     = Math.max( this.maxDepth( node.left ), this.maxDepth( node.right ) ) + 1;
  tempNode.height = Math.max( this.maxDepth( tempNode.left ), this.maxDepth( node.height ) ) + 1;
  return tempNode;
};

/**
 * @description Double Rotate BST node: first left child, with its right child.
 *   Then node k3 with new left child.
 * @param node {TreeNode} Instance of TreeNode object to use in rotation
 */
TreeNode.prototype.doubleRotateWithLeftChild = function ( node ) {
  node.left = this.rotateWithRightChild( node.left );
  return this.rotateWithLeftChild( node );
};

/**
 * @description Rotate BST node with right child
 * @param node {TreeNode} Instance of TreeNode object to use in rotation
 */
TreeNode.prototype.rotateWithRightChild = function ( node ) {
  let tempNode = node.right;

  node.right      = tempNode && tempNode.left ? tempNode.left : null;
  tempNode.left   = node;
  node.height     = Math.max( this.maxDepth( node.left ), this.maxDepth( node.right ) ) + 1;
  tempNode.height = Math.max( this.maxDepth( tempNode.left ), this.maxDepth( node.height ) ) + 1;
  return tempNode;
};

/**
 * @description Double rotate BST node: first right child with its left child.
 *   Then node k1 with new right child.
 * @param node {TreeNode} Instance of TreeNode object to use in rotation
 */
TreeNode.prototype.doubleRotateWithRightChild = function ( node ) {
  node.right = this.rotateWithLeftChild( node.right );
  return this.rotateWithRightChild( node );
};

module.exports = TreeNode;
