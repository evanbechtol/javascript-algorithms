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
    if ( !this.dataIsValid( element ) ) {
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
    const indexInvalid = this.isIndexInvalid(index);

    if ( indexInvalid ) {
      throw new Error( "Invalid index provided" );
    } else if ( !this.dataIsValid( element ) ) {
      throw new Error( "Element cannot be null or undefined" );
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

  /**
   * @description Remove the element at the specified index, and return it
   * @param index {number} Index to remove
   * @return {null}
   */
  removeFrom ( index ) {
    const indexInvalid = this.isIndexInvalid( index );

    if ( indexInvalid ) {
      throw new Error( "Invalid index provided" );
    } else {
      let current = this.head;
      let previous;
      let iterator = 0;

      // If index == 0, head element is deleted
      if ( index === 0 ) {
        this.head = current.next;
      } else {
        // Iterate to the index in the list to delete
        while ( iterator < index ) {
          iterator++;
          previous = current;
          current = current.next;
        }

        // Remove the element from the list
        previous.next = current.next;
      }

      this.size--;

      return current;
    }
  }

  // Todo: implement removeElement(location)

  // Helper Methods
  // Todo: implement isEmpty
  // Todo: implement sizeOfList
  // Todo: implement printList

  /**
   * @description Determines if data is null or undefined
   * @param data {*} Data to validate
   * @return {boolean} Returns true if data is not null and not undefined
   */
  dataIsValid ( data ) {
    return !!data;
  }

  /**
   * @description Determines if the index provided is invalid or not
   * @param index {number} Index to validate
   * @return {boolean|boolean} Returns true if the index is invalid, false otherwise
   */
  isIndexInvalid ( index ) {
    return typeof index !== "number" || index < 0 || ( index > 0 && index > this.size );
  }
}

module.exports = LinkedList;
