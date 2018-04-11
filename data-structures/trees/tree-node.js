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

module.exports = TreeNode;
