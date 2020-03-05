const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const heapSort = require( "./heap-sort" );

describe( "Heap Sort", () => {
  const arr = {
    sorted: [ 0, 1, 3, 4, 8, 9, 10, 66 ],
    unsorted: [ 10, 4, 8, 3, 66, 1, 0, 9 ]
  };

  describe( "Exposed methods", () => {
    it( "left", () => {
      assert.isFunction( heapSort.left, `Method 'left' does not exist` );
    } );

    it( "maxHeapify", () => {
      assert.isFunction( heapSort.maxHeapify, `Method 'maxHeapify' does not exist` );
    } );

    it( "parent", () => {
      assert.isFunction( heapSort.parent, `Method 'parent' does not exist` );
    } );

    it( "right", () => {
      assert.isFunction( heapSort.right, `Method 'right' does not exist` );
    } );
  } );

  describe( "Parent method", () => {
    it( "Parent of 0", () => {
      assert.deepEqual( heapSort.parent( 0 ), 0, `Incorrect parent returned` );
    } );

    it( "Parent of 1", () => {
      assert.deepEqual( heapSort.parent( 1 ), 0, `Incorrect parent returned` );
    } );

    it( "Parent of 2", () => {
      assert.deepEqual( heapSort.parent( 2 ), 1, `Incorrect parent returned` );
    } );

    it( "Parent of 3", () => {
      assert.deepEqual( heapSort.parent( 3 ), 1, `Incorrect parent returned` );
    } );

    it( "Parent of 4", () => {
      assert.deepEqual( heapSort.parent( 4 ), 2, `Incorrect parent returned` );
    } );
  } );


  describe( "Left method", () => {
    it( "Left child of 0", () => {
      assert.deepEqual( heapSort.left( 0 ), 1, `Incorrect left child returned` );
    } );

    it( "Left child of 1", () => {
      assert.deepEqual( heapSort.left( 1 ), 3, `Incorrect left child returned` );
    } );

    it( "Left child of 2", () => {
      assert.deepEqual( heapSort.left( 2 ), 5, `Incorrect left child returned` );
    } );

    it( "Left child of 3", () => {
      assert.deepEqual( heapSort.left( 3 ), 7, `Incorrect left child returned` );
    } );

    it( "Left child of 4", () => {
      assert.deepEqual( heapSort.left( 4 ), 9, `Incorrect left child returned` );
    } );
  } );

  describe( "Right method", () => {
    it( "Right child of 0", () => {
      assert.deepEqual( heapSort.right( 0 ), 2, `Incorrect right child returned` );
    } );

    it( "Right child of 1", () => {
      assert.deepEqual( heapSort.right( 1 ), 4, `Incorrect right child returned` );
    } );

    it( "Right child of 2", () => {
      assert.deepEqual( heapSort.right( 2 ), 6, `Incorrect right child returned` );
    } );

    it( "Right child of 3", () => {
      assert.deepEqual( heapSort.right( 3 ), 8, `Incorrect right child returned` );
    } );

    it( "Right child of 4", () => {
      assert.deepEqual( heapSort.right( 4 ), 10, `Incorrect right child returned` );
    } );
  } );

  describe( "heapSort", () => {
    it( "Should return max heap", () => {
      assert.deepEqual( heapSort.heapSort( [ 16, 4, 10, 14, 7, 9, 3, 2, 8, 1 ] ), [ 1, 2, 3, 4, 7, 8, 9, 10, 14, 16 ], `Max Heap not returned` );
    } );
  } );
} );
