/**
 * @description Implements the queue data structure
 */
class Queue {
  constructor () {
    this.queue = [];
  }

  push ( elem ) {
    if ( !elem ) {
      throw new Error( "Undefined data cannot be inserted into queue" );
    }

    this.queue.push( elem );
  }

  pop () {
    if ( this.isEmpty() ) {
      throw new Error( "Queue underflow" );
    }

    return this.queue.shift();
  }

  getTop () {
    return this.queue[0];
  }

  getQueue() {
    return this.queue;
  }

  isEmpty () {
    return !this.queue.length;
  }
}

module.exports = Queue;
