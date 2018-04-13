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

/**
 * @description Retrieves the height of the left subtree for the node
 * @returns {number} Height of the left subtree of the node, or -1
 */
TreeNode.prototype.leftHeight = function () {
  return this.left ? this.left.height : -1;
};

/**
 * @description Retrieves the height of the right subtree for the node
 * @returns {number} Height of the right subtree of the node, or -1
 */
TreeNode.prototype.rightHeight = function () {
  return this.right ? this.right.height : -1;
};

/**
 * @description Calculates the maximum height between the two subtree heights
 * @param a {int} Height of node subtree as an integer
 * @param b {int} Height of node subtree as an integer
 * @returns {number} Returns the higher of the two values + 1 to account for root
 */
TreeNode.prototype.getMaxHeight = function ( a, b ) {
  return Math.max( a, b ) + 1;
};

/**
 * @description Rotate BST node with right child
 * @returns {TreeNode} Returns the rotated node, which is new subtree root
 */
TreeNode.prototype.rotateWithLeftChild = function () {
  let tempNode = this.left;

  this.left       = tempNode.right;
  tempNode.right  = this;
  this.height     = this.getMaxHeight( this.leftHeight(), this.rightHeight() );
  tempNode.height = this.getMaxHeight( tempNode.leftHeight(), this.height );
  return tempNode;
};


/**
 * @description Rotate BST node with right child
 * @returns {TreeNode} Returns the rotated node, which is new subtree root
 */
TreeNode.prototype.rotateWithRightChild = function () {
  let tempNode = this.right;

  this.right      = tempNode.left;
  tempNode.left   = this;
  this.height     = this.getMaxHeight( this.leftHeight(), this.rightHeight() );
  tempNode.height = this.getMaxHeight( tempNode.rightHeight(), this.height );
  return tempNode;
};

/**
 * @description Rotate BST node with left child
 * @returns {TreeNode} Returns the rotated node, which is new subtree root
 */

/**
 * @description Double Rotate BST node: first left child, with its right child.
 *   Then node k3 with new left child.
 * @returns {TreeNode} Returns the rotated node, which is the new subtree root
 */
TreeNode.prototype.doubleRotateLeft = function () {
  this.left = this.left.rotateWithRightChild();
  return this.rotateWithLeftChild();
};

/**
 * @description Double rotate BST node: first right child with its left child.
 *   Then node k1 with new right child.
 * @returns {TreeNode} Returns the rotated node, which is the new subtree root
 */
TreeNode.prototype.doubleRotateRight = function () {
  this.right = this.right.rotateWithLeftChild();
  return this.rotateWithRightChild();
};

module.exports = TreeNode;
