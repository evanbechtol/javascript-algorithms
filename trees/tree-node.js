function TreeNode ( parent = null, left = null, right = null, key = null ) {
  this.parent = parent;
  this.left   = left;
  this.right  = right;
  this.key    = key;
}

module.exports = TreeNode;
