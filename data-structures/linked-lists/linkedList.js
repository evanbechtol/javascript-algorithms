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
  insertAt ( element, index ) {
    const indexInvalid = typeof index !== "number" || index < 0 || ( index > 0 && index > this.size );

    if ( indexInvalid ) {
      throw new Error( "Invalid index provided" );
    } else {
      let node = new Node( element );

      // If index === 0, make node head
      if ( index === 0 ) {
        node.next = this.head;
        this.head = node;
      } else {
        let current;
        let previous;

        current = this.head;
        let iterator = 0;

        // Iterate over the list to get to the index that we will
        // insert the new node at
        while ( iterator < index ) {
          iterator++;
          previous = current;
          current = current.next;
        }

        // Add the element
        node.next = current;
        previous.next = node;
      }

      this.size++;
    }
  }

  // Todo: implement removeFrom(location)
  // Todo: implement removeElement(location)

  // Helper Methods
  // Todo: implement isEmpty
  // Todo: implement sizeOfList
  // Todo: implement printList
}

module.exports = LinkedList;
