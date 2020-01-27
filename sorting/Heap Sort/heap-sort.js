function compare ( a, b ) {
  return a - b;
}

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
  return left( i ) + 1;
}

/**
 * @description Goes through remaining nodes of  tree and runs maxHeapify on
 * each one
 * @param arr {array} Array to maxHeapify
 * @return {array} Returns maxHeapify operation on array
 */
function buildMaxHeap ( arr ) {
  for ( let i = Math.floor( arr.length / 2 ); i >= 0; i-- ) {
    maxHeapify( arr, i, arr.length );
  }

  return arr;
}

/**
 * @description Attempts to return the max heap of the array provided
 * @param arr {array} Array to maxHeapify
 * @param i {number} Index of the parent element being heapified
 * @param heapSize {number} Length of array to build heap from
 * @return {*}
 */
function maxHeapify ( arr, i, heapSize ) {
  const leftChild = left( i );
  const rightChild = right( i );
  let largest = i;

  // Determine if left is larger then value at largest
  if ( leftChild < heapSize && compare( arr[ leftChild ], arr[ i ] ) > 0 ) {
    largest = leftChild;
  }
  // Determine if right is larger then value at largest
  if ( rightChild < heapSize && compare( arr[ rightChild ], arr[ largest ] ) > 0 ) {
    largest = rightChild;
  }

  // If largest isn't our parent element (i), we swap them so that largest is
  // the parent
  if ( largest !== i ) {
    [ arr[ i ], arr[ largest ] ] = [ arr[ largest ], arr[ i ] ];
    maxHeapify( arr, largest, heapSize );
  }

  return arr;
}

/**
 * @description Sorts the provided array using the heapsort algorithm
 * @param arr {array} Array to sort
 * @return {array} Returns the sorted array
 */
function heapSort ( arr ) {
  let heapSize = arr.length;

  buildMaxHeap( arr );

  for ( let i = arr.length - 1; i > 0; i-- ) {
    [ arr[ 0 ], arr[ i ] ] = [ arr[ i ], arr[ 0 ] ];
    heapSize--;
    maxHeapify( arr, 0, heapSize );
  }

  return arr;
}

module.exports = {
  heapSort,
  left,
  maxHeapify,
  parent,
  right
};
