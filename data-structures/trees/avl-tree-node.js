/**
 * @description Constructor to create an instance of the AVLTreeNode object, which is used by the
 *   Tree object to construct various types of trees.
 * @param parent {object} Parent TreeNode object of the node
 * @param left {object} Left TreeNode object of the node
 * @param right {object} Right TreeNode object of the node
 * @param key {*} Identifier used to Retrieve a node
 * @param data {object} Can be any satellite data needed to be stored in the node
 * @param height {int} Height of the subtree under the node
 * @constructor
 */
function AVLTreeNode ( parent = null, left = null, right = null, key = null, data = null, height = 0 ) {
  this.parent = parent;
  this.left   = left;
  this.right  = right;
  this.key    = key;
  this.data   = data;
  this.height = height;
}

module.exports = AVLTreeNode;
