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
 * @returns {object} Returns sorted array
 */
function insertionSort ( arr ) {
  if ( arr.length ) {
    for ( let i = 1; i < arr.length; i++ ) {
      let current  = arr[ i ],
          previous = i - 1; // Insert elem into the sorted sequence

      /* Every element preceding "previous" has been sorted. This means that we only need to
       * look at the element immediately before the one we are currently holding in "current".
       * If arr[ previous ] > elem, then we know we need to perform a swap.
       */
      while ( previous >= 0 && arr[ previous ] > current ) {
        arr[ previous + 1 ] = arr[ previous-- ];
      }

      arr[ previous + 1 ] = current;
    }

    return arr;
  }

  return [];
}


function main () {
  let arr = [];
  for ( let i = 0; i < 10; i++ ) {
    arr.push( util.randomNumber() );
  }
  console.log( `Unsorted array : ${arr}` );
  console.log( `Sorted array   : ${insertionSort( arr )}` );
}

main();
