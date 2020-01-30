const assert = require( "chai" ).assert;
const mocha = require( "mocha" );
const BST = require( "./bst" );

describe( "BST", () => {
  const BstInstance = new BST();

  describe( "Initialization", () => {
    it( "Create instance of BST class", () => {
      assert.isDefined( BstInstance, "BstInstance is undefined" );
    } );
  } );

  describe( "Exposed methods", () => {
    it( "insert", () => {
      assert.isFunction( BstInstance.insert, "Method insert does not exist" );
    } );

    it( "inorderTreeWalk", () => {
      assert.isFunction( BstInstance.inorderTreeWalk, "Method inorderTreeWalk does not exist" );
    } );
  } );

  describe( "Inorder Tree Walk", () => {
    it( "Should return in tree in order", () => {

    } );
  } );
} );
