import { Comparator } from "../Collections/comparator.js";

export class Sort{

  #comparator;

  constructor(comparator = new compareClass()){

    this.#getCompare;
    this.#comparator = comparator;
  }
  
  bubbleSort(array){

    let _array = [...array];
    let length = array.length;

    for(let i = 0; i < _array.length; i++){
      for(let j = 0; j < length; j++){
        if(this.#getCompare(_array[j], _array[j + 1])){
          let e = _array[j];
          _array[j] = _array[j + 1];
          _array[j + 1] = e;
        }
      }
      length--;
    }
    return _array;
  }

  selectionSort(array){

    let _array = [...array];
    let length = array.length;
    let startIndex = 0;
    let holdIndex = startIndex;

    for(let i = 0; i < _array.length; i++){
      for(let j = startIndex; j < length; j++){
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

  insertionSort(array){}

  quickSort(array){}

  //Helper Functions

  #getCompare = function(a, b){

    return (this.#comparator.compare(a, b) >= 0) ? true : false;
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