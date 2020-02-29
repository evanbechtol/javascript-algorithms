const Node = require( "./node" );

class LinkedList {
  constructor () {
    this.head = null;
    this.size = 0;
  }

  /**
   * @description Add an element to the end of the linked list
   * @param element {*} Data to populate the node with
   */
  add ( element ) {
    if ( !element ) {
      throw new Error( "Element cannot be null or undefined" );
    }

    const node = new Node( element );

    // If list is empty, add node as head of list
    if ( !this.head ) {
      this.head = node;
    } else {
      let current = this.head;

      // Go to the end of the list
      while ( current.next ) {
        current = current.next;
      }

      // Insert node at the end of the list
      current.next = node;
    }

    this.size++;
  }

  /**
   * @description Inserts a node at the given index in the list
   * @param element {*} Data to insert for the Node
   * @param index {number} Index to insert the new Node at
   */
  insertAt(element, index) {

  }

  // Todo: implement removeFrom(location)
  // Todo: implement removeElement(location)

  // Helper Methods
  // Todo: implement isEmpty
  // Todo: implement sizeOfList
  // Todo: implement printList
}

module.exports = LinkedList;
