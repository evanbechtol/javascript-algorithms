module.exports = {
  /**
   * @description Generate a random number between max, and min
   * @param max {int} Integer to represent maximum value generated number can have
   * @param min {int} Integer to represent minimum value generated number can have
   * @returns {number} Returns a randomly generated number between the max and min provided
   */
  randomNumber : ( max = 100, min = 0 ) => {
    return Math.floor( ( Math.random() * max ) + min );
  }
};
