/*
Default sorting is from least to greatest
to change sorting, pass comparator object with compare function in constructor
*/

//When creating queue with inital array, need to sort that - done?
import { Collection } from "../collection.js";
import { Iterator } from "../iterator.js";
import { Comparator } from "../comparator.js";
import { Queue } from "./queue.js";

export class PriorityQueue extends Queue{

  #comparator;

  constructor(...arg){ //is ...arg still needed?
    super();
    if(arg[0] && Object.hasOwn(arg[0].__proto__, 'compare')){
      this.#comparator = arg[0];
    } else {
      this.#comparator = new compareClass();
      if(arg[0] && Collection.prototype.isPrototypeOf(arg[0])){
        try{
          arg[0].toArray().forEach(element =>{
            this.add(element);
          });
        }
        catch(err){
          throw "collection.LinkedList - IllegalArgumentException: Argument must be a collection or empty";
        }
      } else if(Array.isArray(arg)){
        arg.forEach(element =>{
          this.add(element);
        });
      }
    }

    this.#traverse;
    this.#getCompare;
  }

  add(element){

    this.array.push(element);
    let node = this.array.length;
    let parentNode = Math.trunc(node / 2);
    let compare;
    if(parentNode - 1 >= 0){
     compare = this.#comparator.compare(this.array[parentNode - 1], element);
      while(parentNode - 1 >= 0 && compare > 0){
        this.array[node - 1] = this.array[parentNode - 1];
        this.array[parentNode - 1] = element;
        node = parentNode;
        parentNode = Math.trunc(node / 2);
        compare = this.#comparator.compare(this.array[Math.max(0, parentNode - 1)], element);
      }
    }
  }

  poll(){

    let object = this.array.shift();
    this.array.unshift(this.array.pop());

    if(!object){
      throw "collection.ProirityQueue.poll - NoSuchElementException";
    }

    this.#traverse(0)

    return object;
  }

  remove(object){

    let removed = false;

    this.array.forEach((e, i) =>{
      if(e === object){
        let o = this.array.pop();

        this.array[i] = o;
        this.#traverse(i);
        removed = true;
      }
    });

    return removed;
  }

  clear(){
    this.array.length = 0;
  }

  contains(object){
    return this.array.includes(object);
  }

  toArray(){
    return this.array;
  }

  toString(){
    //let string = "[" + this.array + "]"
    //return string;
    return JSON.stringify(this.array);
  }

  iterator(){
    return new Iterator(this.array);
  }

//Helper Functions//
  #traverse(index){ //rename this (rebuildTree ?)

    let object = this.array[index];
    let parentNode = index + 1;
    let childNode = (parentNode * 2) + this.#getCompare(this.array[(parentNode * 2) - 1], this.array[parentNode * 2]);
    let compare;

    if(childNode){
      compare = this.#comparator.compare(object, this.array[childNode - 1]);
    }

    while(compare > 0){
      this.array[parentNode - 1] = this.array[childNode - 1];
      this.array[childNode - 1] = object;
      parentNode = childNode;
      childNode = (parentNode * 2) + this.#getCompare(this.array[(parentNode * 2) - 1], this.array[parentNode * 2]);
      if(childNode){
        compare = this.#comparator.compare(object, this.array[childNode - 1]);
      } else {
        compare = -1;
      }
    }
  }  

  #getCompare = function(a, b){

    let node;
  
    if(a)
      node = 0;
    
    if(b)
      node = 1;
    
    let compare = this.#comparator.compare(a, b);
  
    if(compare)
      node = (compare > 0) ? 1 : 0;
    
    return node;
  }
}

/* class compareClassString extends Comparator{

  compare(a, b){
    try {
      return a.toString().localeCompare(b.toString());
    }
    catch(e){
      return null; //can this cause other errors?
    }
  }
} */

class compareClass extends Comparator{

  compare(a, b){
    if(!a){
      a = Infinity;
    }
    return a - b;
  }
}