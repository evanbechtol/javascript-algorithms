function parent ( i ) {
  return Math.floor( i / 2 );
}

function left ( i ) {
  return 2 * i + 1;
}

function right ( i ) {
  return 2 * i + 2;
}

module.exports = {
  left,
  parent,
  right
};
