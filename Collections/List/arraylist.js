import { Collection } from "../collection.js";
import { Iterator } from "../iterator.js";
import { List } from "./list.js";

export class ArrayList extends List{
  
  constructor(...arg){
    super();

    this.addAll(arg[0]);
  }

  add(arg1, arg2){

    if(!arg2){
      this.array.push(arg1);
    } else {
      this.array.splice(arg2, 0, arg1);
    }
  }

  addAll(collection){

    if(collection && Collection.prototype.isPrototypeOf(collection)){
      try{
        collection.toArray().forEach(element =>{
          this.add(element);
        });
      }
      catch(err){
        throw "collection.LinkedList - IllegalArgumentException: Collection must have toArray method"; //this might never reach
      }
    } else if(Array.isArray(collection)){
      collection.forEach(element =>{
        this.add(element);
      });
    }
  }

  set(index, element){

    this.array[index] = element;
  }

  remove(index){

    this.array.splice(index, 1);
  }

  removeAll(collection){

    if(collection && Collection.prototype.isPrototypeOf(collection)){
      let array = [];

      this.forEach(e =>{
        if(!collection.contains(e)){
          array.push(e);
        }
      });
      this.array = array;
    } else {
      throw "Exception thrown: NullPointerException";
    }
  }

  retainAll(collection){

    if(collection && Collection.prototype.isPrototypeOf(collection)){
      let array = [];

      this.forEach(e =>{
        if(collection.contains(e)){
          array.push(e);
        }
      });
      this.array = array;
    } else {
      throw "Exception thrown: NullPointerException";
    }
  }

  removeIf(filter){

    let array = [];

    this.forEach(e =>{
      if(!filter(e)){
        array.push(e);
      }
    });
    this.array = array;
  }

  removeRange(fromIndex, toIndex){

    this.array.splice(fromIndex, toIndex - fromIndex);
  }

  subList(fromIndex, toIndex){

    return this.array.slice(fromIndex, toIndex);
  }

  clear(){

    this.array.length = 0;
  }

  clone(){

    return this.array;
  }

  contains(object){

    return this.array.includes(object);
  }

  forEach(callback){

    this.array.forEach((e, i) =>{
      callback(e, i);
    })
  };

  get(index){

    return this.array[index];
  };

  indexOf(object){

    return this.array.indexOf(object);
  };

  lastIndexOf(object){

    return this.array.lastIndexOf(object);
  }

  isEmpty(){

    return this.array.length == 0;
  }

  toArray(){

    return this.array;
  }

  toString(){

    return JSON.stringify(this.array);
  }

  listIterator(index = 0){

    return new Iterator(this.array, index);
  }

}