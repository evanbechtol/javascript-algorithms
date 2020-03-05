const Node = require( "./node" );

class LinkedList {
  constructor () {
    this.head = null;
    this.size = 0;
  }

  /**
   * @description Add an element to the end of the linked list
   * @param key {number|string} Unique key to identify node by
   * @param element {*} Data to populate the node with
   */
  add ( key, element ) {
    if ( !key ) {
      throw new Error( "Key cannot be null or undefined" );
    }
    if ( !this.dataIsValid( element ) ) {
      throw new Error( "Element cannot be null or undefined" );
    }

    if ( !this.isKeyValid( key ) ) {
      throw new Error( "Key must be either a number or string" );
    }

    const node = new Node( key, element );

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
   * @param key {number|string} Unique key to identify node by
   * @param element {*} Data to insert for the Node
   * @param index {number} Index to insert the new Node at
   */
  insertAt ( key, element, index ) {
    const indexInvalid = this.isIndexInvalid( index );
    const isKeyValid = this.isKeyValid( key );

    if ( indexInvalid ) {
      throw new Error( "Invalid index provided" );
    } else if ( !this.dataIsValid( element ) ) {
      throw new Error( "Element cannot be null or undefined" );
    } else if ( !isKeyValid ) {
      throw new Error( "Key must be either a number or string" );
    } else {
      let node = new Node( key, element );

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
   * @return {object} Returns the object that was removed from the list
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

  /**
   * @description Removes an element from the list using the key provided
   * @param key {number|string} Unique key to look for
   * @return {object|null} Returns the removed object if found, otherwise null
   */
  removeElementWithKey ( key ) {
    if ( !key ) {
      throw new Error( "Key cannot be null or undefined" );
    } else {
      let current = this.head;
      let previous = null;

      while ( current !== null ) {
        // Compare element with current element
        // If found, then remove it and return element
        if ( current.key === key ) {
          if ( !previous ) {
            this.head = current.next;
          } else {
            previous.next = current.next;
          }

          this.size--;
          return current;
        }

        previous = current;
        current = current.next;
      }

      return null;
    }
  }

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
   * @return {boolean|boolean} Returns true if the index is invalid, false
   *   otherwise
   */
  isIndexInvalid ( index ) {
    return typeof index !== "number" || index < 0 || ( index > 0 && index > this.size );
  }

  /**
   * @description Determines if the key passed in is valid. A key cannot be null
   * or undefined. Key must also be either a number or string.
   * @param key {number|string} Key to check for validity
   * @return {boolean} Returns true if key is valid, otherwise false.
   */
  isKeyValid ( key ) {
    return typeof key === "string" || typeof key === "number";
  }
}

module.exports = LinkedList;
