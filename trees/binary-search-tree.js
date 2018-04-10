const TreeNode = require( './tree-node.js' ),
      Tree     = require( './tree' ),
      util     = require( '../util' );

/**
 * @description Inserts a TreeNode object into the tree, in the proper position following BST properties
 * @param tree {object} Instance of Tree object
 * @param node {object} Instance of TreeNode object
 * @returns {*} Returns the inserted node
 */
function insert ( tree, node ) {
  let parent  = null,
      current = tree.root;

  while ( current !== null ) {
    parent  = current;
    current = node.key < current.key ? current = current.left : current.right;
  }

  node.parent = parent;
  if ( parent === null ) {
    tree.root = node; // Tree was empty
  } else if ( node.key < parent.key ) {
    parent.left = node; // Insert left child
  } else {
    parent.right = node; // Insert right child
  }

  return node;
}

/**
 * @description Attempts to delete the node from the tree provided.
 * @param tree {object} Instance of Tree object
 * @param node {object} Instance of TreeNode object
 * @returns {*} Returns deleted node if node was found and deleted, otherwise returns null
 */
function deletion ( tree, node ) {
  if ( node ) {
    if ( node.left === null ) {
      if ( node.left === null ) {
        transplant( tree, node, node.right );
      }
    } else if ( node.right === null ) {
      transplant( tree, node, node.right );
    } else {
      let min = minimum( node.right );

      if ( min.parent !== node ) {
        transplant( tree, min, min.right );
        min.right        = node.right;
        min.right.parent = min;
      }

      transplant( tree, node, min );
      min.left        = node.left;
      min.left.parent = min;
    }
    return node;
  }
  return null;
}

/**
 * @description Transplants a subtree to a new parent. This is used when deleting nodes, and rearranging the BST
 * @param tree {object} Instance of Tree object
 * @param subtreeA {object} Instance of TreeNode object
 * @param subtreeB {object} Instance of TreeNode object
 */
function transplant ( tree, subtreeA, subtreeB ) {
  if ( subtreeA.parent === null ) {
    tree.root = subtreeB;
  } else if ( subtreeA === subtreeA.parent.left ) {
    subtreeA.parent.left = subtreeB;
  } else {
    subtreeA.parent.right = subtreeB;
  }
}

/**
 * @description Retrieves the minimum key value of nodes in the tree
 * @param node {object} Instance of a TreeNode object
 * @returns {*} Returns the minimum key value for the provided tree
 */
function minimum ( node ) {
  while ( node.left !== null ) {
    node = node.left;
  }
  return node;
}

/**
 * @description Retrieves the maximum key value of nodes in the tree
 * @param node {object} Instance of a TreeNode object
 * @returns {*} Returns the maximum key value for the provided tree
 */
function maximum ( node ) {
  while ( node.right !== null ) {
    node = node.right;
  }
  return node;
}

/**
 * @description If all keys are distinct, the successor of the node is that which has the smallest key greater than
 *   'node'. If right subtree of node is nonempty, successor of 'node' is the leftmost node in the right subtree.
 * @param node {object} Instance of a TreeNode node
 * @returns {*} Returns the successor node for the provided node
 */
function successor ( node ) {
  if ( node.right !== null ) {
    return minimum( node.right );
  }
  let successor = node.parent;

  while ( successor !== null && node === successor.right ) {
    node      = successor;
    successor = successor.parent;
  }
  return successor;
}

/**
 * @description Performs a recursive search for the value provided, across all nodes in the tree, starting from 'node'
 * @param node {object} Instance of TreeNode object
 * @param value {*} Value to search for, must match data type of the key
 * @returns {*} Returns the node found matching the value, or null if no node was found
 */
function search ( node, value ) {
  if ( node === null || node.key === value ) {
    return node;
  }

  if ( value < node.key ) {
    return search( node.left, value );
  } else {
    return search( node.right, value );
  }
}

function inOrderWalk( node ) {
  if ( node !== null ) {
    inOrderWalk( node.left );
    console.log( node.key );
    inOrderWalk( node.right );
  }
}

function main () {
  let tree = new Tree(),
  nodesToInsert = 10;

  for ( let i = 0; i < nodesToInsert; i++ ) {
    console.log( `Inserted node with key : ${insert( tree, new TreeNode( null, null, null, util.randomNumber( 20, 1 ) ) ).key}` );
  }

  let nodeToDelete = minimum( tree.root ),
  successorOfNodeToDelete = successor( nodeToDelete );
  console.log( `Tree Root Key: ${tree.root.key}` );
  console.log( `Search for  node with key ${nodeToDelete.key} : ${search( tree.root, nodeToDelete.key ) ? 'Node found' : 'Node not found'}` );
  console.log( `Successor of ${nodeToDelete.key} is node ${successorOfNodeToDelete.key}`);
  console.log( `Parent  of ${successorOfNodeToDelete.key} is node ${successorOfNodeToDelete.parent.key}`);
  console.log( `Deleted node with key : ${deletion( tree, nodeToDelete ) ? `Node with key ${nodeToDelete.key} deleted` : `Node with key ${nodeToDelete.key} not deleted`}` );
  console.log( `Search for  node with key ${nodeToDelete.key} : ${search( tree.root, nodeToDelete.key ) ? 'Node found' : 'Node not found'}` );
  console.log( `Minimum value in tree is: ${minimum( tree.root ).key}`);
  console.log( `Minimum value in tree is: ${maximum( tree.root ).key}`);
  console.log( `Performing In order Walk of tree:`);
  inOrderWalk( tree.root );
}

main();
