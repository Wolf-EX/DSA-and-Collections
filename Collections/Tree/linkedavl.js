import { Comparator } from "../comparator.js";


class Node{

  constructor(value, height = 0){
    this.value = value;
    this.height = height;
    this.depth = 0;
    this.leftChild, this.rightChild, this.parentNode;
  }
}

export class LinkedAVL{


  #comparator;

  constructor(...arg){

    if(arg[0] && Object.hasOwn(arg[0].__proto__, 'compare')){
      this.#comparator = arg[0];
    } else {
      this.#comparator = new compareClassString();
    }

    this.headNode;

    this.#getCompare;
    this.#equals;
    this.#rotateNode;
    this.#getChildNode;
    this.#getSide;
  }

  add(object){
 
    let currentNode = this.headNode;
    let childNode;
    let compare;

    if(currentNode){
      
      compare = this.#getCompare(object, currentNode.value);
      childNode = this.#getChildNode(currentNode, compare);

      let height = 1;
      while(childNode != null){
        currentNode = childNode;
        compare = this.#getCompare(object, currentNode.value);
        childNode = this.#getChildNode(currentNode, compare);
        height++;
      }

      let _object = new Node(object, height);
      _object.parentNode = currentNode;
      if(compare == 1){
        currentNode.leftChild = _object;
        currentNode = currentNode.leftChild;
      } else if(compare == 2){
        currentNode.rightChild = _object;
        currentNode = currentNode.rightChild;
      }

      let unbalancedNode = this.#updateDepth(currentNode);
      if(unbalancedNode != null){

        let direction = (unbalancedNode.balanceFactor < 0) ? 1 : 2;
        let childDirection = (this.#getChildNode(unbalancedNode, direction).balanceFactor < 0) ? 1 : 2;

        if(direction != childDirection){
          this.#rotateNode(this.#getChildNode(unbalancedNode, direction), childDirection);
        }
        this.#rotateNode(unbalancedNode, direction);
      }
    } else {
      this.headNode = new Node(object);
    }
  }


  //fix up all this to be cleaner
  #rotateNode(node, balanceDirection){

    let rotateDirection = -balanceDirection + 3;

    //set child of node to nodes parent
    let childNode = this.#getChildNode(node, balanceDirection);
    childNode.parentNode = node.parentNode;
    childNode.height--;
    if(this.headNode == node){
      this.headNode = childNode;
    } else {
      let side = this.#getSide(node); //1 left, 2 right
      if(side == 1){
        node.parentNode.leftChild = childNode;
      } else if(side == 2){
        node.parentNode.rightChild = childNode;
      }
    }
    
    //set child of nodes child of rotation direction to nodes child of opposite rotation
    let otherChildNode = this.#getChildNode(childNode, rotateDirection); //temp name - grandChildNode?
    if(otherChildNode){
      otherChildNode.parentNode = node;
    }
    if(balanceDirection == 1){
      node.leftChild = otherChildNode;
      childNode.rightChild = node;
    } else if(balanceDirection == 2){
      node.rightChild = otherChildNode;
      childNode.leftChild = node;
    }

    //set node to child node of child node
    node.parentNode = childNode;

    //update depth and balancefactor
    this.postOrderTraverse(childNode, [], childNode.height, (e, i) => {

      e.height = i;

      let leftChild = (e.leftChild != null) ? e.leftChild.depth : e.height;
      let rightChild = (e.rightChild != null) ? e.rightChild.depth : e.height;

      e.depth = Math.max(leftChild, rightChild);
      e.balanceFactor = rightChild - leftChild;
    });
  }

  inOrderTraverse(node = this.headNode, array = [], index = 0, callback = null){

    if(node.leftChild){
      this.inOrderTraverse(node.leftChild, array, index + 1, callback);
    }
    if(node){
      if(callback){
        callback(node, index);
      }
      array.push(node);
    }

    if(node.rightChild){
      this.inOrderTraverse(node.rightChild, array, index + 1, callback);
    }
    return array;
  }

  preOrderTraverse(node = this.headNode, array = [], index = 0, callback = null){

    if(node.leftChild){
      this.preOrderTraverse(node.leftChild, array, index + 1, callback);
    }
    if(node){
      if(callback){
        callback(node, index);
      }
      array.push(node);
    }

    if(node.rightChild){
      this.preOrderTraverse(node.rightChild, array, index + 1, callback);
    }
    return array;
  }

  postOrderTraverse(node = this.headNode, array = [], index = 0, callback = null){

    if(node.leftChild){
      this.postOrderTraverse(node.leftChild, array, index + 1, callback);
    }

    if(node.rightChild){
      this.postOrderTraverse(node.rightChild, array, index + 1, callback);
    }
    if(node){
      if(callback){
        callback(node, index);
      }
      array.push(node);
    }
    return array;
  }

  toString(){

    let string = "[";
    this.inOrderTraverse(this.headNode).forEach(e => {
      string += e.value + ",";
    });
    string = string.substring(0, Math.max(string.length - 1, 1));
    string +="]";
    return string;
  }


  #updateDepth(node){

    let _node = node;
    let unbalancedNode = null;

    while(_node != null){
      

      let leftChild = (_node.leftChild != null) ? _node.leftChild.depth : _node.height;
      let rightChild = (_node.rightChild != null) ? _node.rightChild.depth : _node.height;

      _node.depth = Math.max(leftChild, rightChild);

      _node.balanceFactor = rightChild - leftChild; //remove, for debug
      let balanceFactor = rightChild - leftChild;
      if(balanceFactor > 1 || balanceFactor < -1){
        unbalancedNode = _node;
      }
      _node = _node.parentNode;
    }

    return unbalancedNode;
  }

  #getChildNode(node, side = 1){
    //1 for left, 2 for right - Maybe make enum?
    return (side == 1) ? node.leftChild : node.rightChild;
  }

  #getSide(node){
    if(node.parentNode && node.parentNode.leftChild == node){
      return 1;
    } else if(node.parentNode && node.parentNode.rightChild == node){
      return 2;
    }
  }

  #getCompare = function(a, b){

    return (this.#comparator.compare(a, b) <= 0) ? 1 : 2;
  }

  #equals(object1, object2){

    return ((object1 && Object.hasOwn(object1.__proto__, 'equals') && object1.equals(object2)) || (object1 === object2)) ? true : false;
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
      return a.toString().localeCompare(b.toString());
    }
    catch(e){
      return null; //can this cause other errors?
    }
  }
}