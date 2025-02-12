import { Comparator } from "../Collections/comparator.js";

export class Sort{

  #comparator;

  constructor(comparator = new compareClass()){

    this.#getCompare;
    this.#comparator = comparator;

    this.iterations = 0;
  }
  
  bubbleSort(array){

    let _array = [...array];
    let length = array.length;

    this.iterations = 0;

    for(let i = 0; i < _array.length; i++){
      this.iterations++;
      let hasSwapped = false;
      for(let j = 0; j < length; j++){
        this.iterations++;
        if(this.#getCompare(_array[j], _array[j + 1])){
          let e = _array[j];
          _array[j] = _array[j + 1];
          _array[j + 1] = e;
          hasSwapped = true;
        }

      }

      //console.log(hasSwapped)
      if(hasSwapped == false){
        break;
      }
      //console.log("iterations")
      length--;
    }
    return _array;
  }

  selectionSort(array){

    let _array = [...array];
    let length = array.length;
    let startIndex = 0;
    let holdIndex = startIndex;

    this.iterations = 0;

    for(let i = 0; i < _array.length; i++){
      this.iterations++;
      for(let j = startIndex; j < length; j++){
        this.iterations++;
        holdIndex = this.#getCompare(_array[holdIndex], _array[j]) ? j : holdIndex;
      }
      let e = _array[startIndex];
      _array[startIndex] = _array[holdIndex];
      _array[holdIndex] = e;
      startIndex++;
      holdIndex = startIndex;
    }
    return _array;
  }

  insertionSort(array){

    let _array = [...array];

    this.iterations = 0;

    for(let i = 1; i < _array.length; i++){
      this.iterations++;
      let currentValue = _array[i];
      for(let j = i - 1; j >= 0; j--){
        this.iterations++;
        if(this.#getCompare(currentValue, _array[j])){
          break;
        }
        _array[j + 1] = _array[j];
        _array[j] = currentValue;

      }
    }
    return _array;
  }

  //Missing optimization on decending order and random
  quickSort(array){

    let _array = [...array];
    let lock = [];
    let left = 0;
    let right = _array.length - 1;
    
    let swapIndex = left;
    let pivot = right;

    this.iterations = 0;

    while(left != right){
      this.iterations++;
      for(let i = left; i <= pivot; i++){
        this.iterations++;
        if(this.#getCompare(_array[pivot], _array[i])){

          let e = _array[swapIndex];
          _array[swapIndex] = _array[i];
          _array[i] = e;

          swapIndex++;
        }
      }
      swapIndex--;
      lock[swapIndex] = true;

      if(swapIndex == right){
        right--;
      }

      pivot = right;

      let leftHit = false;
      for(let i = left; i < right; i++){
        this.iterations++;

        if(leftHit == false){
          if(lock[i] != true){
            left = i;
            leftHit = true;
          }
        } else if(lock[i] == true && lock[i - 1] != true){
          pivot = i - 1;
          break;
        }
      }
      swapIndex = left;
    }

    return _array;
  }

  //Helper Functions

  #getCompare = function(a, b){

    return (this.#comparator.compare(a, b) >= 0) ? true : false;
  }
}


class compareClass extends Comparator{

  compare(a, b){
    if(a == null){
      a = Infinity;
    }
    return a - b;
  }
}