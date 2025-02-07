import { Collection } from "../collection.js";
import { Comparator } from "../comparator.js";

export class BST extends Collection{

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
    this.#getChildNode, this.#getParentNode;
    this.#inOrderNode;
    this.#swapInOrderNodes;
    this.#getLowestValueNode, this.#getHighestValueNode;

    //avl balance
    this.#getNodeHeight, this.#getNodeBalanceFactor;
    this.#rotateNode;

    this.#mod;//temp
  }

  add(object){

    let currentNode = 0;
    let currentObject = this.array[currentNode];
    while(currentObject != null){
      currentNode = this.#getChildNode(currentNode, this.#getCompare(object, currentObject));
      currentObject = this.array[currentNode];
    }
    this.array[currentNode] = object;
  }

  search(object){

    let currentNode = 0;
    let currentObject = this.array[currentNode];
    while(currentObject != null){
      if(this.#equals(object, currentObject)){
        return currentNode;
      }
      currentNode = this.#getChildNode(currentNode, this.#getCompare(object, currentObject));
      currentObject = this.array[currentNode];
    }
    return -1;
  }

  remove(object){

    let deletingNode = this.search(object);
    if(deletingNode != -1){
      this.array[deletingNode] = null;
      this.#swapInOrderNodes(deletingNode);
      while(this.array[this.array.length - 1] == null){
        this.array.pop();
      }
    }
  }

  //Probably more effiecient linking each childNode to nodes
  avlBalance(tree = this.array){

    let _tree = tree;
    let _array = [];

    _tree.forEach((e, i) =>{
      _array[i] = new Node(e, i);
    });

    let nodes = this.postOrderTraverse(_array);

    nodes.forEach(e =>{
      this.#updateDepth(_array, e.index);
    });

    let balanceFactor = 0;

    do{
    nodes.forEach(e => {


      balanceFactor = this.#getNodeBalanceFactor(_array, e.index);
      if(balanceFactor < -1 || balanceFactor > 1){

        if(e != null){

          let direction = (balanceFactor < 0) ? 1 : 2;
          let childDirection = (this.#getNodeBalanceFactor(_array, this.#getChildNode(e.index, direction)) < 0) ? 1 : 2;

          if(direction != childDirection){
            this.#rotateNode(_array, this.#getChildNode(e.index, direction), childDirection);
          }
          this.#rotateNode(_array, e.index, direction);
        }
      }
    });
  } while (balanceFactor < -1 || balanceFactor > 1);

    let array = [];
    _array.forEach((e, i) =>{
      if(e){
        array[i] = e.value;
      }
    })

    return array;
  }

  preOrderTraverse(tree = this.array, node = 0, array = []){

      let childNode = this.#getChildNode(node, 1);
    if(tree[node]){
      array.push(tree[node]);
    }
    if(tree[childNode]){
      this.preOrderTraverse(tree, childNode, array);
    }
    childNode = this.#getChildNode(node, 2);
    if(tree[childNode]){
      this.preOrderTraverse(tree, childNode, array);
    }
    return array;
  }

  inOrderTraverse(tree = this.array, node = 0, array = []){

    let childNode = this.#getChildNode(node, 1);
    if(tree[childNode]){
      this.inOrderTraverse(tree, childNode, array);
    }
    if(tree[node]){
      array.push(tree[node]);
    }
    childNode = this.#getChildNode(node, 2);
    if(tree[childNode]){
      this.inOrderTraverse(tree, childNode, array);
    }
    return array;
  }


  postOrderTraverse(tree = this.array, node = 0, array = []){

    let childNode = this.#getChildNode(node, 1);
    if(tree[childNode]){
      this.postOrderTraverse(tree, childNode, array);
    }
    childNode = this.#getChildNode(node, 2);
    if(tree[childNode]){
      this.postOrderTraverse(tree, childNode, array);
    }
    if(tree[node]){
      array.push(tree[node]);
    }
    return array;
  }

  toString(){

    return JSON.stringify(this.array);
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

  #getChildNode(node, side = 1){
    //1 for left, 2 for right - Maybe make enum?
    return (node * 2) + side;
  }

  #getParentNode(node){
    return Math.floor((node - 1) / 2);
  }

  #getNodeHeight(node){
    return Math.trunc(Math.log2(node + 1));
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

  #equals(object1, object2){

    return ((object1 && Object.hasOwn(object1.__proto__, 'equals') && object1.equals(object2)) || (object1 === object2)) ? true : false;
  }

  #getCompare = function(a, b){

    return (this.#comparator.compare(a, b) <= 0) ? 1 : 2;
  }

  //AVL Balance
  #rotateNode(tree = this.array, node, direction){
    let _tree = tree;
    let nodes = [];
    let rotateDirection = -direction + 3;//reverse rotation direction

    //moving nodes of rotation down
    this.postOrderTraverse(_tree, this.#getChildNode(node, rotateDirection)).forEach(e => {
      
      let side = this.#mod(e.index, 2) //1 left, 0 right
      e.index = this.#getChildNode(e.index + ((rotateDirection == 1) ? side - 1 : side) , (side == 1) ? 1 : 2);
      nodes.push(e);
    });

    //move unbalanced node down and fix opposite directions child
    _tree[node].index = this.#getChildNode(node, rotateDirection);
    nodes.push(_tree[node]);

    let otherChild = this.#getChildNode(node, direction);
    this.preOrderTraverse(_tree, this.#getChildNode(otherChild, rotateDirection)).forEach((e, i) => {
      _tree[e.index] = null;
      e.index = e.index + Math.pow(2, Math.ceil(Math.log2(i + 1))) * ((rotateDirection == 1) ? -1 : 1); //bug here?
      nodes.push(e);
    });

    //move nodes of opposite rotation up
    if(_tree[otherChild]){

      _tree[otherChild].index = node;
      nodes.push(_tree[otherChild]);
      _tree[otherChild] = null;

      this.preOrderTraverse(_tree, this.#getChildNode(otherChild, direction)).forEach((e, i) => {

        let side = this.#mod(e.index, 2) //1 left, 0 right
        side = (rotateDirection == 1) ? -side - 1: -side;
        _tree[e.index] = null;
        e.index = Math.ceil(e.index / 2) + side;
        nodes.push(e);
      });
    }

    //loop through changed array and set array to its index
    nodes.forEach(e =>{
      _tree[e.index] = e;
    });


    //update thier depth
    nodes.forEach(e =>{
      this.#updateDepth(_tree, e.index);
    });

    //clean up null nodes at end of array
    while(_tree[_tree.length - 1] == null){
      _tree.pop();
    }
  }

  //Updates the depth of node and all parent nodes
  #updateDepth(tree = this.array, node){

    let _tree = tree;
    let unbalancedNode = null;

    while(_tree[node] != null){
      

      let leftChild = (_tree[this.#getChildNode(node, 1)] != null) ? _tree[this.#getChildNode(node, 1)].depth : this.#getNodeHeight(node);
      let rightChild = (_tree[this.#getChildNode(node, 2)] != null) ? _tree[this.#getChildNode(node, 2)].depth : this.#getNodeHeight(node);

      _tree[node].depth = Math.max(leftChild, rightChild);
      //_tree[node].balanceFactor = rightChild - leftChild; //remove, for debug
      let balanceFactor = rightChild - leftChild;
      if(balanceFactor > 1 || balanceFactor < -1){
        unbalancedNode = node;
      }
      node = this.#getParentNode(node);
    }

    return unbalancedNode;
  }

  #getNodeBalanceFactor(tree, node){

    let leftChild = (tree[this.#getChildNode(node, 1)] != null) ? tree[this.#getChildNode(node, 1)].depth : this.#getNodeHeight(node);
    let rightChild = (tree[this.#getChildNode(node, 2)] != null) ? tree[this.#getChildNode(node, 2)].depth : this.#getNodeHeight(node);

    return rightChild - leftChild;
  }

  //temp
  #mod(n, d){

    return ((n % d) + d) % d;
    //return -(Math.floor(n / d) * d - n);
  }
}

class Node{

  constructor(value, index){
    this.value = value;
    this.index = index;
    this.depth;
  }
}

class compareClass extends Comparator{

  compare(a, b){
    if(!a){
      a = Infinity;
    }
    return a - b;
  }
}

class compareClassString extends Comparator{
  
  compare(a, b){
    try {
      return a.toString().localeCompare(b.toString());
    }
    catch(e){
      return null; //can this cause other errors?
    }
  }
}
