/**
 * @description Implements the stack data structure
 */
class Stack {
  constructor () {
    this.stack = [];
    this.top = this.stack.length;
  }

  push ( elem ) {
    if ( !elem ) {
      throw new Error( "Undefined data cannot be inserted into stack" );
    }

    this.stack.push( elem );
    this.setTop(this.stack.length);
  }

  pop () {
    if ( this.isEmpty() ) {
      throw new Error( "Stack underflow" );
    }

    let value = this.stack.pop();
    this.setTop(this.stack.length);

    return value;
  }

  getTop () {
    return this.stack[this.top - 1];
  }

  setTop ( value ) {
    this.top = value;
  }

  getStack() {
    return this.stack;
  }

  isEmpty () {
    return this.top === 0;
  }
}

module.exports = Stack;
