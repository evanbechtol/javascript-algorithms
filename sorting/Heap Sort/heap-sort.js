/**
 * @description Retrieves the parent for the provided index
 * @param i {number} Index to return the parent of
 * @return {number} Index of parent
 */
function parent ( i ) {
  return Math.floor( i / 2 );
}

/**
 * @description Retrieves the left child for the provided index
 * @param i {number} Index to return the left child of
 * @return {number} Index of left child
 */
function left ( i ) {
  return 2 * i + 1;
}

/**
 * @description Retrieves the right child for the provided index
 * @param i {number} Index to return the right child of
 * @return {number} Index of right child
 */
function right ( i ) {
  return 2 * i + 2;
}

module.exports = {
  left,
  parent,
  right
};
