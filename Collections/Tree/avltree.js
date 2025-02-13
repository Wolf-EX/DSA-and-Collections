import { Comparator } from "../comparator.js";
import { BinarySearchTree } from "./binarysearchtree.js";

//fix up variable names, clean up code
//Test and Fix delete function
export class AVLTree extends BinarySearchTree{


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
    this.#getChildNode, this.#getParentNode;
    this.#inOrderNode;
    this.#swapInOrderNodes;
    this.#getLowestValueNode, this.#getHighestValueNode;
    this.#getNodeHeight, this.#getNodeBalanceFactor;
  }

  add(object){

    let currentNode = 0;
    let currentObject = this.array[currentNode];

    while(currentObject != null){
      currentNode = this.#getChildNode(currentNode, this.#getCompare(object, currentObject));
      currentObject = this.array[currentNode];
    }
    this.array[currentNode] = new Node(object, currentNode);
    let unbalancedNode = this.#updateDepth(currentNode);
    if(unbalancedNode != null){

      let direction = (this.#getNodeBalanceFactor(unbalancedNode) < 0) ? 1 : 2;
      let childDirection = (this.#getNodeBalanceFactor(this.#getChildNode(unbalancedNode, direction)) < 0) ? 1 : 2;
      if(direction != childDirection){
        this.#rotateNode(this.#getChildNode(unbalancedNode, direction), childDirection);
      }
      this.#rotateNode(unbalancedNode, direction);
    }
  }

  #rotateNode(node, direction){
    let nodes = [];
    let rotateDirection = -direction + 3;//reverse rotation direction

    //moving nodes of rotation down
    this.postOrderTraverse(this.#getChildNode(node, rotateDirection)).forEach(e => {
      
      let side = math.mod(e.index, 2); //1 left, 0 right
      e.index = this.#getChildNode(e.index + ((rotateDirection == 1) ? side - 1 : side) , (side == 1) ? 1 : 2);
      nodes.push(e);
    });

    //move unbalanced node down and fix opposite directions child
    this.array[node].index = this.#getChildNode(node, rotateDirection);
    nodes.push(this.array[node]);

    let otherChild = this.#getChildNode(node, direction);
    this.preOrderTraverse(this.#getChildNode(otherChild, rotateDirection)).forEach((e, i) => {
      this.array[e.index] = null;
      e.index = e.index + (Math.pow(2, Math.ceil(Math.log2(i + 1))) * (rotateDirection == 1) ? -1 : 1); //might be wrong, might need trunc instead of ceil
      nodes.push(e);
    });

    //move nodes of opposite rotation up
    if(this.array[otherChild]){

      this.array[otherChild].index = node;
      nodes.push(this.array[otherChild]);
      this.array[otherChild] = null;

      this.preOrderTraverse(this.#getChildNode(otherChild, direction)).forEach((e, i) => {

        let side = math.mod(e.index, 2); //1 left, 0 right
        side = (rotateDirection == 1) ? -side - 1: -side;
        this.array[e.index] = null;
        e.index = Math.ceil(e.index / 2) + side;
        nodes.push(e);
      });
    }


    //loop through changed array and set array to its index
    nodes.forEach(e =>{
      this.array[e.index] = e;
    });

    //update their depth
    nodes.forEach(e =>{
      this.#updateDepth(e.index);
    });

    //clean up null nodes at end of array
    while(this.array[this.array.length - 1] == null){
      this.array.pop();
    }
  }

  toString(){

    let string = "[";
    for(let i = 0; i < this.array.length; i++){
      string += (this.array[i]) ? this.array[i].value + "," : "null,";
    }
    string = string.substring(0, Math.max(string.length - 1, 1));
    string +="]";
    return string;
  }

  preOrderTraverse(node = 0, array = []){

    let childNode = this.#getChildNode(node, 1);
    if(this.array[childNode]){
      this.postOrderTraverse(childNode, array);
    }
    if(this.array[node]){
      array.push(this.array[node]);
    }
    childNode = this.#getChildNode(node, 2);
    if(this.array[childNode]){
      this.postOrderTraverse(childNode, array);
    }
    return array;
  }

  postOrderTraverse(node = 0, array = []){


    let childNode = this.#getChildNode(node, 1);
    if(this.array[childNode]){
      this.postOrderTraverse(childNode, array);
    }
    childNode = this.#getChildNode(node, 2);
    if(this.array[childNode]){
      this.postOrderTraverse(childNode, array);
    }
    if(this.array[node]){
      array.push(this.array[node]);
    }
    return array;
  }

  #inOrderNode(node){

    return (this.array[this.#getChildNode(node, 2)]) ? this.#getLowestValueNode(this.#getChildNode(node, 2)) : this.#getHighestValueNode(this.#getChildNode(node, 1));
  }

  #swapInOrderNodes(node){

    let inOrderNode = this.#inOrderNode(node);

    if(this.array[inOrderNode] != null){
      this.array[node] = this.array[inOrderNode];
      this.array[inOrderNode] = null;
      this.#swapInOrderNodes(inOrderNode);
    }
  }

  #updateDepth(node){

    let _node = node;
    let unbalancedNode = null;

    while(this.array[_node] != null){
      

      let leftChild = (this.array[this.#getChildNode(_node, 1)] != null) ? this.array[this.#getChildNode(_node, 1)].depth : this.#getNodeHeight(_node);
      let rightChild = (this.array[this.#getChildNode(_node, 2)] != null) ? this.array[this.#getChildNode(_node, 2)].depth : this.#getNodeHeight(_node);

      this.array[_node].depth = Math.max(leftChild, rightChild);

      this.array[_node].balanceFactor = rightChild - leftChild; //remove, for debug
      let balanceFactor = rightChild - leftChild;
      if(balanceFactor > 1 || balanceFactor < -1){
        unbalancedNode = _node;
      }
      _node = this.#getParentNode(_node);
    }

    return unbalancedNode;
  }

  #getNodeHeight(node){
    return Math.trunc(Math.log2(node + 1));
  }

  #getNodeBalanceFactor(node){

    let leftChild = (this.array[this.#getChildNode(node, 1)] != null) ? this.array[this.#getChildNode(node, 1)].depth : this.#getNodeHeight(node);
    let rightChild = (this.array[this.#getChildNode(node, 2)] != null) ? this.array[this.#getChildNode(node, 2)].depth : this.#getNodeHeight(node);

    return rightChild - leftChild;
  }

  #getChildNode(node, side = 1){
    //1 for left, 2 for right - Maybe make enum?
    return (node * 2) + side;
  }

  #getParentNode(node){
    return Math.floor((node - 1) / 2);
  }

  #getLowestValueNode(node){

    let currentNode = node;
    while(this.array[this.#getChildNode(currentNode, 1)]){
      currentNode = this.#getChildNode(currentNode, 1);
    }
    return currentNode;
  }

  #getHighestValueNode(node){

    let currentNode = node;
    while(this.array[this.#getChildNode(currentNode, 2)]){
      currentNode = this.#getChildNode(currentNode, 2);
    }
    return currentNode;
  }

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
    this.depth;

    this.balanceFactor = 0; //for debug purpose, remove later
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