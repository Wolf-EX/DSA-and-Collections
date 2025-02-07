import { ArrayList } from "../List/arraylist.js";

export class Map{
  constructor(){
    this.array = [];
  }

  clear(){
    throw new Error(`Method 'clear' must be implemented in '${this.constructor.name}'.`);
  };

  containsKey(object){
    throw new Error(`Method 'containsKey' must be implemented in '${this.constructor.name}'.`);
  };

  containsValue(object){
    throw new Error(`Method 'containsValue' must be implemented in '${this.constructor.name}'.`);
  };

  entrySet(){
    throw new Error(`Method 'entrySet' must be implemented in '${this.constructor.name}'.`);
  };

  equals(object){
    throw new Error(`Method 'equals' must be implemented in '${this.constructor.name}'.`);
  };

  get(object){
    throw new Error(`Method 'get' must be implemented in '${this.constructor.name}'.`);
  };

  hashCode(){
    throw new Error(`Method 'hashCode' must be implemented in '${this.constructor.name}'.`);
  };

  isEmpty(){
    throw new Error(`Method 'isEmpty' must be implemented in '${this.constructor.name}'.`);
  };

  keySet(){
    throw new Error(`Method 'keySet' must be implemented in '${this.constructor.name}'.`);
  };

  put(key, object){
    throw new Error(`Method 'put' must be implemented in '${this.constructor.name}'.`);
  };
  
  putAll(map){
    throw new Error(`Method 'putAll' must be implemented in '${this.constructor.name}'.`);
  };

  remove(){
    throw new Error(`Method 'remove' must be implemented in '${this.constructor.name}'.`);
  };

  size(){
    throw new Error(`Method 'size' must be implemented in '${this.constructor.name}'.`);
  };

  values(){
    //create new ArrayList
    //Loop through this.array and add(this.array[1]);
    //return arraylist
    let arrayList = new ArrayList();
    this.forEach((key, value) => {
      arrayList.add(value);
    });
    return arrayList;
  }

  forEach(callback){

    let value;
    let key;
    this.array.forEach((e, i) => {
      key = e[0];
      value = e[1];
      callback(key, value)
    });
  }
}