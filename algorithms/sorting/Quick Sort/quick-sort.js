const { compare } = require( "../../../util" );

/**
 * @description Performs the quicksort algorithm on the provided array
 * @param arr {array}
 * @param left {number}
 * @param right {number}
 * @param length {number}
 * @return {*} Returns the sorted array
 */
function quickSort ( arr, left, right, length ) {
  let initialLeftPos = left;
  let initialRightPos = right;
  let direction = true;
  let pivot = right;

  while ( ( left - right ) < 0 ) {
    if ( direction ) {

      if ( arr[ pivot ] < arr[ left ] ) {
        // quickSort.swap( arr, pivot, left );
        [ arr[ pivot ], arr[ left ] ] = [ arr[ left ], arr[ pivot ] ];
        pivot = left;
        right--;
        direction = !direction;
      } else {
        left++;
      }
    } else {

      if ( arr[ pivot ] <= arr[ right ] ) {
        right--;
      } else {
        // quickSort.swap( arr, pivot, right );
        [ arr[ pivot ], arr[ right ] ] = [ arr[ right ], arr[ pivot ] ];
        left++;
        pivot = right;
        direction = !direction;
      }
    }
  }

  if ( pivot - 1 > initialLeftPos ) {
    quickSort( arr, initialLeftPos, pivot - 1, length );
  }

  if ( pivot + 1 < initialRightPos ) {
    quickSort( arr, pivot + 1, initialRightPos, length );
  }

  return arr;
}

module.exports = { quickSort };
