function Heap () {
  let data = [],

}


Heap.prototype.buildMaxHeap = function () {

};


Heap.prototype.maxHeapify = function () {
  this.data = this._maxHeapify( this.data, 0 );
};

Heap.prototype._maxHeapify = function ( arr, idx ) {
  let left  = this.left( idx ),
      right = this.right( idx ),
      largest;

  if ( left < arr.length && arr[ left ] > arr[ idx ] ) {
    largest = left;
  } else {
    largest = idx;
  }

  if ( right < arr.length && arr[ right ] > arr[ largest ] ) {
    largest = right;
  }

  if ( largest !== idx ) {
    let temp = arr[ idx ];

    arr[ idx ]     = arr[ largest ];
    arr[ largest ] = temp;
    this._maxHeapify( arr, largest );
  }

  return arr;
};


Heap.prototype.parent = function ( idx ) {
  return idx ? Math.floor( idx / 2 ) : null;
};


Heap.prototype.left = function ( idx ) {
  return idx ? 2 * idx : null;
};


Heap.prototype.right = function ( idx ) {
  return idx ? ( 2 * idx ) + 1 : null;
};
