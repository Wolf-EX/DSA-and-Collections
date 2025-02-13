import { Comparator } from "../comparator.js";
import { BinarySearchTree } from "./binarysearchtree.js";

export class RedBlackTree extends BinarySearchTree{

  #comparator;

  constructor(...arg){
    super();

    if(arg[0] && Object.hasOwn(arg[0].__proto__, 'compare')){
      this.#comparator = arg[0];
    } else {
      this.#comparator = new compareClassString();
    }

    this.#getCompare;
    this.#equals;
    this.#rotateNode;
  }

  add(object){}

  #rotateNode(node, direction){}

  #getCompare = function(a, b){

    return (this.#comparator.compare(a, b) <= 0) ? 1 : 2;
  }

  #equals(object1, object2){

    return ((object1 && Object.hasOwn(object1.__proto__, 'equals') && object1.equals(object2)) || (object1 === object2)) ? true : false;
   }

}

class Node{

  constructor(value, index){
    this.value = value;
    this.index = index;
    this.color = 0;//0 red, 1 black
  }
}

class compareClass extends Comparator{

  compare(a, b){
    if(!a){
      a = {value : Infinity};
    }
    return a.value - b.value;
  }
}

class compareClassString extends Comparator{
  
  compare(a, b){
    try {
      return a.toString().localeCompare(b.value.toString());
    }
    catch(e){
      return null; //can this cause other errors?
    }
  }
}