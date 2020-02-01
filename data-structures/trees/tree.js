/**
 * @description Constructor to create an instance of a Tree object
 * @param root {object} Optional parameter. Can provide a root node to
 *   initialize tree with
 * @constructor
 */
function Tree ( root = null ) {
  this.root = root;
  this.size = 0;
}

/**
 * @description Adds keys from leftmost to right most (in ascending order of
 *   keys) to an array, then returns the array
 * @returns {Array} Returns the tree keys sorted in order of key value
 */
Tree.prototype.inOrderWalk = function () {
  let result = [],
    traverse = function ( node ) {
      if ( node !== null ) {
        traverse( node.left );
        result.push( node.key );
        traverse( node.right );
      }
    };
  traverse( this.root );
  return result;
};

/**
 * @description Adds keys with the subtree roots first, then the keys in those
 *   subtrees
 * @returns {Array} Returns the tree keys sorted in pre-order
 */
Tree.prototype.preOrderWalk = function () {
  let result = [],
    traverse = function ( node ) {
      if ( node !== null ) {
        result.push( node.key );
        traverse( node.left );
        traverse( node.right );
      }
    };
  traverse( this.root );
  return result;
};

/**
 * @description Adds keys of the subtrees first, then the root keys for those
 *   subtrees
 * @returns {Array} Returns the tree keys sorted in post-order
 */
Tree.prototype.postOrderWalk = function () {
  let result = [],
    traverse = function ( node ) {
      if ( node !== null ) {
        traverse( node.left );
        traverse( node.right );
        result.push( node.key );
      }
    };
  traverse( this.root );
  return result;
};

/**
 * @description Retrieves the minimum key value of nodes in the tree
 * @returns {*} Returns the minimum key value for the provided tree
 */
Tree.prototype.minimum = function ( node = this.root ) {
  while ( node.left !== null ) {
    node = node.left;
  }
  return node;
};

/**
 * @description Retrieves the maximum key value of nodes in the tree
 * @returns {*} Returns the maximum key value for the provided tree
 */
Tree.prototype.maximum = function ( node = this.root ) {
  while ( node.right !== null ) {
    node = node.right;
  }
  return node;
};

/**
 * @description If all keys are distinct, the successor of the node is that
 *   which has the smallest key greater than 'node'.
 * @param node {object} Instance of a TreeNode node
 * @returns {*} Returns the successor node for the provided node
 */
Tree.prototype.successor = function ( node ) {
  if ( node.right !== null ) {
    return this.minimum( node.right );
  }
  let successor = node.parent;

  while ( successor !== null && node === successor.right ) {
    node = successor;
    successor = successor.parent;
  }
  return successor;
};

/**
 * @description If all keys are distinct, the predecessor of the node is that
 *   which has the smallest key less than 'node'.
 * @param node {object} Instance of a TreeNode node
 * @returns {*} Returns the predecessor node for the provided node
 */
Tree.prototype.predecessor = function ( node ) {
  if ( node.left !== null ) {
    return this.maximum( node.left );
  }
  let predecessor = node.parent;

  while ( predecessor !== null && node === predecessor.left ) {
    node = predecessor;
    predecessor = predecessor.parent;
  }
  return predecessor;
};

/**
 * @description Performs a recursive search for the value provided, across all
 *   nodes in the tree, starting from 'node'
 * @param value {*} Key to search for, must match data type of the key
 * @returns {*} Returns the node found matching the key, or null if no node was
 *   found
 */
Tree.prototype.get = function ( value ) {
  let node = this.root;

  let traverse = function ( node ) {
    if ( !node || node.key === value ) {
      return node;
    }

    if ( value < node.key ) {
      return traverse( node.left, value );
    } else {
      return traverse( node.right, value );
    }
  };

  return traverse( node );
};

module.exports = Tree;
