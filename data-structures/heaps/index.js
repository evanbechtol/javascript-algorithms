const assert = require( 'assert' );

function Heap ( arr = [] ) {
  this.data     = arr;
  this.heapSize = this.data.length;
}


Heap.prototype.buildMaxHeap = function () {
  this.heapSize = this.data.length;
  for ( let i = Math.floor( this.data.length / 2 ); i >= 0; i-- ) {
    console.log( `maxHeapify with idx ${i}` );
    this.maxHeapify( this.data, i );
  }
};

Heap.prototype.maxHeapify = function ( arr, idx ) {
  let left  = this.left( idx ),
      right = this.right( idx ),
      largest;
  console.log( `arr[${idx}] = ${arr[ idx ]} has arr[${left}] = ${arr[ left ]} and arr[${right}] = ${arr[ right ]}` );
  //console.log( `maxHeapify with idx ${idx}` );
  if ( left <= this.heapSize && arr[ left ] > arr[ idx ] ) {
    largest = left;
  } else {
    largest = idx;
  }

  if ( right <= this.heapSize && arr[ right ] > arr[ largest ] ) {
    largest = right;
  }
  console.log( `Largest is index ${largest} with value ${arr[ largest ]}` );
  if ( largest !== idx ) {
    let temp = arr[ idx ];
    console.log( `Old array: ${arr}` );
    console.log( `swapping ${arr[ idx ]} with ${arr[ largest ]}` );
    arr[ idx ]     = arr[ largest ];
    arr[ largest ] = temp;
    console.log( `New array: ${arr}` );
    this.maxHeapify( arr, largest );
  }
};


Heap.prototype.parent = function ( idx ) {
  return idx ? Math.floor( idx / 2 ) : null;
};


Heap.prototype.left = function ( idx ) {
  if ( idx === 0 || idx % 3 === 0 ) {
    return ( 2 * idx ) + 1;
  }
  return idx ? 2 * idx : null;
};


Heap.prototype.right = function ( idx ) {
  if ( idx === 0 || idx % 3 === 0 ) {
    return ( 2 * idx ) + 2;
  }
  return idx ? ( 2 * idx ) + 1 : null;
};


function main () {
  let arr      = [ 16, 4, 10, 14, 7, 9, 3, 2, 8, 1 ],
      expected = [ 16, 14, 10, 8, 7, 9, 3, 2, 4, 1 ],
      heap     = new Heap( arr );

  console.log( heap.data );
  console.log( heap.maxHeapify( heap.data, 1 ) );
  console.log( heap.data );
  console.log( expected );
}

main();
