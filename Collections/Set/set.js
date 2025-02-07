import { Collection } from "../collection.js";

export class Set extends Collection{
  constructor(){
    super();
    this.array = [];
  }

  add(element){
    throw new Error(`Method 'add' must be implemented in '${this.constructor.name}'.`);
  }

  addAll(collection){
    throw new Error(`Method 'addAll' must be implemented in '${this.constructor.name}'.`);
  }

  clear(){
    throw new Error(`Method 'clear' must be implemented in '${this.constructor.name}'.`);
  };

  contains(element){
    throw new Error(`Method 'contains' must be implemented in '${this.constructor.name}'.`);
  };

  containsAll(collection){
    throw new Error(`Method 'containsAll' must be implemented in '${this.constructor.name}'.`);
  };

  hashCode(){
    throw new Error(`Method 'hashCode' must be implemented in '${this.constructor.name}'.`);
  };

  isEmpty(){
    throw new Error(`Method 'isEmpty' must be implemented in '${this.constructor.name}'.`);
  };

  remove(element){
    throw new Error(`Method 'remove' must be implemented in '${this.constructor.name}'.`);
  };

  removeAll(collection){
    throw new Error(`Method 'add' must be implemented in '${this.constructor.name}'.`);
  }

  retainAll(collection){
    throw new Error(`Method 'add' must be implemented in '${this.constructor.name}'.`);
  }

  size(){
    throw new Error(`Method 'size' must be implemented in '${this.constructor.name}'.`);
  };

  toArray(){
    throw new Error(`Method 'toArray' must be implemented in '${this.constructor.name}'.`);
  };
}