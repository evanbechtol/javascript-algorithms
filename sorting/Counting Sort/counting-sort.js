/**
 * @description Performs the counting sort algorithm on the provided array,
 * which is a non-comparison sorting algorithm with a runtime complexity of
 * O(n + k), which is linear time. It does this by maintaining an auxiliary
 * array of length "max", which will hold the count of each value.
 * it to
 * @param arr {array} Array to sort
 * @param min {number}
 * @param max {number} The maximum value in the array
 * @returns {*}
 */
function countingSort ( arr, min, max ) {
  let i = min;
  let j = 0;
  let length = arr.length;
  let count = [];

  for ( i; i <= max; i++ ) {
    count[ i ] = 0;
  }
  for ( i = 0; i < length; i++ ) {
    count[ arr[ i ] ] += 1;
  }
  for ( i = min; i <= max; i++ ) {
    while ( count[ i ] > 0 ) {
      arr[ j ] = i;
      j++;
      count[ i ]--;
    }
  }
  return arr;
}

module.exports = { countingSort };
