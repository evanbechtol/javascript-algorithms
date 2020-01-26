const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const heapSort  = require( "./heap-sort" );

describe( "Heap Sort", () => {
  const arr = {
    sorted: [ 0, 1, 3, 4, 8, 9, 10, 66 ],
    unsorted: [ 10, 4, 8, 3, 66, 1, 0, 9 ]
  };

  describe( "Exposed methods", () => {
    it( "parent", () => {
      assert.isFunction( heapSort.parent,  `Method 'parent' does not exist` );
    } );

    it( "left", () => {
      assert.isFunction( heapSort.left,  `Method 'left' does not exist` );
    } );

    it( "right", () => {
      assert.isFunction( heapSort.right,  `Method 'right' does not exist` );
    } );
  });


} );
