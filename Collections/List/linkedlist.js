import { Collection } from "../collection.js";
import { Iterator } from "../iterator.js";
import { List } from "./list.js";

export class LinkedList extends List{
  
  constructor(...arg){
    super();

    this.currentNode;
    this.headNode = new Node(null);
    this.tailNode;

    this.#traverse;
    this.#search;
    this.#getNodeAtPosition;
    this.#equals;


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


  add(arg1, arg2){

    if(!arg2){
      let node = this.#traverse(this.headNode);
      node.next = new Node(arg1);
      this.array.push(node.next);
      this.tailNode = node.next;
    } else {
      let node = this.#getNodeAtPosition(arg1);
      let newNode = new Node(arg2);
      newNode.next = node.next;
      node.next = newNode;
      this.array.push(newNode);
      if(newNode.next == null){
        this.tailNode = newNode;
      }
    }
  }

  addFirst(object){
    let node = new Node(object);
    node.next = this.headNode.next;
    this.headNode.next = node;
    this.array.push(node);
  };

  addLast(object){
    this.add(object);
  };

  addAll(arg1, arg2){
    if(!arg2){
      arg1.toArray().forEach(element =>{
        this.add(element);
      })
    } else {
      arg2.toArray().forEach((element, index) =>{
        this.add(arg1 + index, element);
      })
    }
  };

  remove(arg1){
    let node;
    if(typeof arg1 === 'number' || arg1 == null){
      if(arg1 == null){
        arg1 = 0;
      }
      node = this.#getNodeAtPosition(arg1);
    } else {
      node = this.#search(this.headNode, arg1);
    }
    /* if(!node){
      throw "collection.LinkedList.remove - ArrayIndexOutOfBounds";
    } */
    let removingNode = node.next;
    node.next = node.next.next;
    this.array.splice(this.indexOf(removingNode), 1);
    if(node.next == null){
      this.tailNode = node;
    }
    return removingNode.object;
  }

  removeFirst(){
    return this.remove();
  }

  removeLast(){
    let node = this.#traverse(this.headNode, this.tailNode);
    let removingNode = node.next;
    node.next = null;
    this.array.splice(this.indexOf(removingNode), 1);
    this.tailNode = node;
    return removingNode;
  }

  clear(){
    this.array.length = 0;
    this.headNode.next = null;
  };

  clone(){
    return this;
  };

  //update this with indexOf implementation
  contains(object){
    let currentNode = this.headNode;
    while(currentNode.next){
      if(currentNode.next.object === object){
        return true;
      } else {
        currentNode = currentNode.next;
      }
    }
    return false;
  };

  get(index){
    let node = this.#getNodeAtPosition(index + 1);
     if(!node){
      throw "collection.LinkedList.remove - ArrayIndexOutOfBounds";
    }
    return node.object;
  };

  getFirst(){
    return this.headNode.next;
  }

  getLast(){
    return this.tailNode;
  }

  indexOf(object){

    let currentNode = this.headNode;
    let count = 0;
    while(currentNode.next){
      if(!this.#equals(object, currentNode.next.object)){
        currentNode = currentNode.next;
        count++
      } else {
        return count;
      }
    }
    return -1;
  };

  toArray(){
    let tempArray = [];
    let currentNode = this.headNode;
    while(currentNode.next){
      tempArray.push(currentNode.next.object);
      currentNode = currentNode.next;
    }
    return tempArray;
  };

  toString(){
    let string = "[";
    let currentNode = this.headNode.next;
    while(currentNode != null){
      string += currentNode.object + ", ";
      currentNode = currentNode.next;
    }
    //string = string.substring(0, string.length - 2);
    string = string.substring(0, Math.max(string.length - 2, 1));
    string += "]";
    return string;
  }

  iterator(index){
    return new LinkedListIterator(this, index);
  }

  //Helper Functions

  //returns the node before the targetNode()
  #traverse(startNode, targetNode){
    let currentNode = startNode;
    //while(currentNode.next != targetNode){
    while(currentNode.next && !this.#equals(currentNode.next, targetNode)){
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  #search(startNode, targetObject){
    let currentNode = startNode;
    while(currentNode.next){
      //if(currentNode.next.object != targetObject){
      if(!this.#equals(currentNode.next.object, targetObject)){
        currentNode = currentNode.next;
      } else {
        return currentNode;
      }
    }
    return null;
  }

  #getNodeAtPosition(index){
    let node = this.headNode;
    for(let i = 0; i < index; i++){
      node = node.next;
    }
    return node;
  }

  #equals(object1, object2){

    if(object1 && Object.hasOwn(object1.__proto__, 'equals') && object1.equals(object2)){
      return true;
    } else if(object1 === object2){
      return true;
    } else {
      return false;
    }
  }
}

class Node{
  constructor(object){
    this.object = object;
    this.next = null;
  }

  toString(){
    return this.object;
  }
}

class LinkedListIterator extends Iterator{
  constructor(list, index){
    super(list.array);
    this.currentNode = list.headNode;
    if(index){
      this.index = index - 1;
      this.currentNode = list.get(index - 1);
    }
    this.list = list;    
  }

  next(){
    this.index++;
    this.currentNode = this.currentNode.next;
    return this.currentNode;
  }

  hasNext(){
    return (this.currentNode.next != null);
  }

  remove(){
    this.list.remove(this.index);
    this.index--;
  }
}