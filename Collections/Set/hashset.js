import { Collection } from "../collection.js";
import { Iterator } from "../iterator.js";
import { HashMap } from "../Map/hashmap.js";
import { Set } from "./set.js";

export class HashSet extends Set{
  constructor(...arg){
    super();
    this.PRESENT = null;

     if(Collection.prototype.isPrototypeOf(arg[0])){
      //collection passed
      this.map = new HashMap();
      arg[0].toArray().forEach(element =>{
        this.map.put(element, this.PRESENT);
      });
     } else {
      this.map = new HashMap(...arg);
     }
  }

  add(element){
    if(this.map.get(element) !== undefined){
      return false;
    } else {
      this.map.put(element, this.PRESENT);
      return true;
    }
  }

  clear(){
    this.map.clear();
  }

  contains(object){
    return this.map.get(object) ? true :  false;
  }

  remove(object){
    return this.map.remove(object) ? true : false;
  }

  isEmpty(){
    return this.map.isEmpty();
  }

  size(){
    return this.map.size();
  }

  clone(){
    return this;
  }

  iterator(){
    return new Iterator(this.map.keySet());
  }

  toString(){
    
    return JSON.stringify(this.map.keySet());
  }
}