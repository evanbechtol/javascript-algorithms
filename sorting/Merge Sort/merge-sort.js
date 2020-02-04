const util = require( "../../util" );

/**
 * @description Performs the merge step of the algorithm by combining arrays
 * depending on the sort order provided (asc/desc).
 * @param left {array} Left sub-array to merge
 * @param right {array} Right sub-array to merge
 * @param sortOrder {string} Can be either "asc" or "desc" to determine how the
 * sub-arrays are merged
 * @returns {*[]}
 */
function merge ( left, right, sortOrder = "asc" ) {
  let result = [];
  let leftIdx = 0;
  let rightIdx = 0;

  while ( leftIdx < left.length && rightIdx < right.length ) {
    if ( util.sortComparison( sortOrder, right[ rightIdx ], left[ leftIdx ] ) ) {
      result.push( left[ leftIdx ] );
      leftIdx++;
    } else {
      result.push( right[ rightIdx ] );
      rightIdx++;
    }
  }

  return result.concat( left.slice( leftIdx ) ).concat( right.slice( rightIdx ) );
}

/**
 * @description Performs an merge sort on the provided array. Merge sort is
 *   a divide-and-conquer sorting algorithm . It is good for data which
 *   cannot be stored in RAM. It is also stable.
 *   Merge sort has the following performance:
 *   Worst-case: O(nlogn)
 *   Average-case: O(nlogn)
 *   Best-case: O(nlogn)
 *   Worst-case space complexity: O(n) total
 * @param arr {object} Array to be sorted
 * @param sortOrder {string} Direction that the array should be sorted in
 * @param sortOrder {string} Order to sort, can be set to either 'asc' or
 *   'desc'. Defaults to 'asc'
 * @returns {object} Returns sorted array
 */
function mergeSort ( arr, sortOrder = "asc" ) {
  if ( arr.length <= 1 ) {
    return arr;
  }

  const middle = Math.floor( arr.length / 2 );
  const left = arr.slice( 0, middle );
  const right = arr.slice( middle );

  return merge( mergeSort( left ), mergeSort( right ), sortOrder );
}


module.exports = { mergeSort };
