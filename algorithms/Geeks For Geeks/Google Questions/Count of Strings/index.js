/**
 URL: https://www.geeksforgeeks.org/count-strings-can-formed-using-b-c-given-constraints/
 Description: Given a length n, count the number of strings of length n that can be made using ‘a’, ‘b’ and ‘c’ with at-most one ‘b’ and two ‘c’s allowed.
 Example:
 Input : n = 3
 Output : 19
 Below strings follow given constraints:
 aaa aab aac aba abc aca acb acc baa
 bac bca bcc caa cab cac cba cbc cca ccb
 Input  : n = 4
 Output : 39
 */

/**
 * @description Returns the number of strings possible, given a string
 * length 'n'
 * @param n {number} Length of string
 * @return {number}
 */
function countStrings ( n ) {
  // 1 + 2n + n((n^2 - 1) / 2)
  return 1 + ( n * 2 ) + ( n * ( ( n * n ) - 1 ) / 2 );
}

module.exports = { countStrings };
