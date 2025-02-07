import { Collection } from "../collection.js";

export class List extends Collection{
  
  constructor(){
    super();
  }

  add(){
    throw new Error(`Method 'add' must be implemented in '${this.constructor.name}'.`);
  };

  addAll(){
    throw new Error(`Method 'addAll' must be implemented in '${this.constructor.name}'.`);
  };

  clear(){
    throw new Error(`Method 'clear' must be implemented in '${this.constructor.name}'.`);
  };

  remove(){
    throw new Error(`Method 'remove' must be implemented in '${this.constructor.name}'.`);
  };

  contains(){
    throw new Error(`Method 'contains' must be implemented in '${this.constructor.name}'.`);
  };

  get(){
    throw new Error(`Method 'get' must be implemented in '${this.constructor.name}'.`);
  };

  indexOf(){
    throw new Error(`Method 'indexOf' must be implemented in '${this.constructor.name}'.`);
  };
}