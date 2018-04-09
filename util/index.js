module.exports = {
  randomNumber : ( max = 100, min = 0 ) => {
    return Math.floor( ( Math.random() * max ) + min );
  }
};
