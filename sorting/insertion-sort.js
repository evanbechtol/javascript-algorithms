const util = require( '../util' );

/**
 * @description Performs an insertion sort on the provided array. Insertion sort is an stable, in-place sorting algorithm. It
 *   is efficient for sorting small data sets, or data sets that may be partially sorted.
 *   Insertion sort has the following performance:
 *   Worst-case: O(n^2) comparisons and swaps
 *   Average-case: O(n^2) comparisons and swaps
 *   Best-case: O(n) comparisons, O(1) swaps
 *   Worst-case space complexity: O(n) total, O(1) auxiliary
 * @param arr {object} Array to be sorted
 * @param sortOrder {string} Order to sort, can be set to either 'asc' or 'desc'. Defaults to 'asc'
 * @returns {object} Returns sorted array
 */
function insertionSort ( arr, sortOrder = 'asc' ) {
  if ( arr.length ) {
    for ( let i = 1; i < arr.length; i++ ) {
      let current  = arr[ i ],
          previous = i - 1; // Insert elem into the sorted sequence

      /* Every element preceding "previous" has been sorted. This means that we only need to
       * look at the element immediately before the one we are currently holding in "current".
       * If arr[ previous ] > elem, then we know we need to perform a swap.
       */

      while ( previous >= 0 && sortComparison( sortOrder, arr[ previous ], current ) ) {
        arr[ previous + 1 ] = arr[ previous-- ];
      }

      arr[ previous + 1 ] = current;
    }

    return arr;
  }

  return [];
}

/**
 * @description Performs the appropriate comparison to sort the array in either ascending or descending order
 * @param sortOrder {string} If set to 'asc' will sort in ascending order, all else sorts descending
 * @param previous {*} Previous element to perform comparison with
 * @param current {*} Current element to perform comparison with
 * @returns {boolean} Returns results of the comparison to determine sorting
 */
function sortComparison ( sortOrder, previous, current ) {
  return sortOrder === 'asc' ? previous > current : previous < current;
}

function main () {
  let arr = [];
  for ( let i = 0; i < 10; i++ ) {
    arr.push( util.randomNumber() );
  }
  console.log( `Unsorted array : ${arr}` );
  console.log( `Sorted array ascending   : ${insertionSort( arr, 'asc' )}` );
  console.log( `Sorted array descending  : ${insertionSort( arr, 'desc' )}` );
}

main();
