function Heap ( arr = [] ) {
  this.data = arr;
  this.size = this.data.length;
}

Heap.prototype.compare = function ( a, b ) {
  if ( a > b ) {
    return 1;
  }
  if ( a < b ) {
    return -1;
  }
  return 0;
};

Heap.prototype.buildMaxHeap = function () {
  this.size = this.data.length;

  let mid = Math.floor( this.size / 2 );

  for ( let i = mid; i >= 0; i-- ) {
    this.maxHeapify( i );
  }
};

Heap.prototype.maxHeapify = function ( parent ) {
  if ( parent > this.size ) {
    return;
  }

  let left    = this.left( parent ),
      right   = this.right( parent ),
      largest = parent;


  if ( left && this.compare( this.data[ left ], this.data[ parent ] ) > 0 ) {
    largest = left;
  }

  if ( right && this.compare( this.data[ right ], this.data[ largest ] ) > 0 ) {
    largest = right;
  }

  if ( largest !== parent ) {
    this.swap( parent, largest );
    this.maxHeapify( largest );
  }
};


Heap.prototype.swap = function ( a, b ) {
  let temp       = this.data[ a ];
  this.data[ a ] = this.data[ b ];
  this.data[ b ] = temp;
};

Heap.prototype.parent = function ( idx ) {
  if ( idx % 2 ) {
    return ( idx - 1 ) / 2;
  }
  return ( idx / 2 ) - 1;
};


Heap.prototype.left = function ( parent ) {
  let childIdx = 2 * parent + 1;
  return childIdx <= this.size ? childIdx : null;
};


Heap.prototype.right = function ( parent ) {
  let childIdx = 2 * parent + 2;
  return childIdx <= this.size ? childIdx : null;
};


function main () {
  let arr  = [ 16, 4, 10, 14, 7, 9, 3, 2, 8, 1, 11, 20, 12, 5 ],
      heap = new Heap( arr );

  console.log( heap.data );
  console.log( heap.buildMaxHeap() );
  console.log( heap.data );
}

main();
