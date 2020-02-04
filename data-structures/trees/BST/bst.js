const TreeNode = require( "../tree-node.js" );
const Tree = require( "../tree" );
const util = require( "../../../util" );

/**
 * @description Creates a new instance of a BST (Binary Search Tree) object
 * @param tree {Tree} Optional parameter. Can either pass an existing tree, or
 *   if omitted creates a new empty tree
 * @constructor
 */
function BST ( tree = new Tree() ) {
  this.tree = tree;
}

/**
 * @description Inserts a TreeNode object into the tree, in the proper position
 *   following BST properties
 * @param node {object} Instance of TreeNode object
 * @returns {*} Returns the inserted node
 */
BST.prototype.insert = function ( node ) {
  if ( node ) {
    if ( !this.tree.root ) {
      this.tree.root = node;
      this.tree.size++;
    } else {
      let parent = null;
      let current = this.tree.root;

      while ( current ) {
        parent = current;
        current = util.compare( node.key, current.key ) < 0 ? current.left : current.right;
      }

      node.parent = parent;
      if ( node.key < parent.key ) {
        node.parent = parent;
        parent.left = node;// Insert left child
      } else {
        node.parent = parent;
        parent.right = node; // Insert right child
      }

      this.tree.size++;
      return node;
    }
  }

  return node;
};

/**
 * @description Attempts to delete the node from the tree provided.
 * @param node {object} Instance of TreeNode object
 * @returns {*} Returns deleted node if node was found and deleted, otherwise
 *   returns null
 */
BST.prototype.delete = function ( node ) {
  if ( node ) {
    if ( !node.left ) {
      this.transplant( node, node.right );
    } else if ( !node.right ) {
      this.transplant( node, node.left );
    } else {
      let min = this.tree.minimum( node.right );

      if ( min.parent !== node ) {
        this.transplant( min, min.right );
        min.right = node.right;
        min.right.parent = min;
      }

      this.transplant( node, min );
      min.left = node.left;
      min.left.parent = min;
    }
    this.tree.size--;
    return node;
  }
  return null;
};

/**
 * @description Starting from the root, search for a node that has the
 * matching key provided
 * @param key {*} The key to find in the BST
 * @return {null|Object} Returns null if the node is not found,
 * or the node if the node is found
 */
BST.prototype.search = function ( key ) {
  let node = this.tree.root;

  while ( node ) {
    if ( util.compare( key, node.key ) < 0 ) {
      node = node.left;
    } else if ( util.compare( key, node.key ) > 0 ) {
      node = node.right;
    } else {
      return node;
    }
  }

  if ( !node ) {
    return null;
  }
};

/**
 * @description Transplants a subtree to a new parent. This is used when
 *   deleting nodes, and rearranging the BST
 * @param subtreeA {object} Instance of TreeNode object
 * @param subtreeB {object} Instance of TreeNode object
 */
BST.prototype.transplant = function ( subtreeA, subtreeB ) {
  if ( !subtreeA.parent ) {
    this.tree.root = subtreeB;
  } else if ( subtreeA === subtreeA.parent.left ) {
    subtreeA.parent.left = subtreeB;
  } else {
    subtreeA.parent.right = subtreeB;
  }

  if ( subtreeB ) {
    subtreeB.parent = subtreeA.parent;
  }
};

/**
 * @description Determines the minimum depth of a binary tree node.
 * @param {object} node The node to check.
 * @return {int} The minimum depth of a binary tree node.
 */
BST.prototype.minDepth = function ( node ) {
  return node ? 1 + Math.min( this.minDepth( node.left ), this.minDepth( node.right ) ) : 0;
};

/**
 * @description Determines the maximum depth of a binary tree node.
 * @param {object} node The node to check.
 * @return {int} The maximum depth of a binary tree node.
 */
BST.prototype.maxDepth = function ( node ) {
  return node ? 1 + Math.max( this.maxDepth( node.left ), this.maxDepth( node.right ) ) : 0;
};

/**
 * @description Determines whether a binary tree is balanced.
 * @returns {boolean} Whether the tree is balanced.
 */
BST.prototype.isBalanced = function () {
  return this.tree.root ? this.maxDepth( this.tree.root ) - this.minDepth( this.tree.root ) <= 1 : false;
};

module.exports = BST;
