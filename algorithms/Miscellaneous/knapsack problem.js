/**
 * Problem Description: You have a list of items, where every
 * item has a value and a weight. You also have a bag which
 * has a maximum weight of X.
 *
 * Write a program that maximizes the value of the items you
 * put into the bag, whilst ensuring that you don't exceed the
 * maximum weight. The program should return a list of id's for
 * the solution.
 */

const items = [
  { id: "a", value: 10, weight: 3 },
  { id: "b", value: 6, weight: 8 },
  { id: "c", value: 3, weight: 3 }
];
const maxWeight = 8;

function knapsack ( items, W ) {
  let totalValue = 0;
  let totalWeight = 0;

  let remainingItems = items.sort( ( a, b ) => {
    return ( b.value / b.weight ) - ( a.value / a.weight );
  } );

  while ( remainingItems.length > 0 ) {
    const remainingCapacity = W - totalWeight;
    remainingItems = remainingItems.filter( ( item ) => {
      return ( item.weight <= remainingCapacity );
    } );
    if ( remainingItems.length === 0 ) {
      continue;
    }
    const addedItem = remainingItems.shift();
    totalValue = totalValue + addedItem.value;
    totalWeight = totalWeight + addedItem.weight;
  }
  return totalValue.toFixed( 2 );
}

console.log( knapsack( items, maxWeight ) );
