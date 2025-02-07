import { Iterable } from "./iterable.js";

export class Collection extends Iterable{
  
  constructor(){
    super();
  }

  add(object){
    throw new Error(`Method 'add' must be implemented in '${this.constructor.name}'.`);
  }

  remove(object){
    throw new Error(`Method 'remove' must be implemented in '${this.constructor.name}'.`);
  }

  clear(){
    throw new Error(`Method 'clear' must be implemented in '${this.constructor.name}'.`);
  }

  contains(object){
    throw new Error(`Method 'contains' must be implemented in '${this.constructor.name}'.`);
  }

  equals(object){
    throw new Error(`Method 'equals' must be implemented in '${this.constructor.name}'.`);
  }

  size(){
    return this.array.length;
  }

  isEmpty(){
    return this.array.length == 0;
  }

  toArray(){
    throw new Error(`Method 'toArray' must be implemented in '${this.constructor.name}'.`);
  }
}