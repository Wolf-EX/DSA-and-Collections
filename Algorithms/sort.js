//Javascripts build in sort is many times faster.
import { Comparator } from "../Collections/comparator.js";

export class Sort{

  #comparator;

  constructor(comparator = new compareClass()){

    this.#getCompare;
    this.#comparator = comparator;

    this.operation = 0; //For testing
  }
  
  bubbleSort(array){

    let _array = [...array];
    let length = array.length;

    this.operation = 0;

    for(let i = 0; i < _array.length; i++){
      let hasSwapped = false;
      for(let j = 0; j < length; j++){
        this.operation++;
        if(this.#getCompare(_array[j], _array[j + 1])){
          this.operation++;
          let e = _array[j];
          _array[j] = _array[j + 1];
          _array[j + 1] = e;
          hasSwapped = true;
        }
      }

      if(hasSwapped == false){
        this.operation++;
        break;
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

    this.operation = 0;

    for(let i = 0; i < _array.length; i++){
      for(let j = startIndex; j < length; j++){
        this.operation++;
        holdIndex = this.#getCompare(_array[holdIndex], _array[j]) ? j : holdIndex;
      }
      this.operation++;
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

    this.operation = 0;

    for(let i = 1; i < _array.length; i++){
      let currentValue = _array[i];
      for(let j = i - 1; j >= 0; j--){
        if(this.#getCompare(currentValue, _array[j])){
          this.operation++;
          break;
        }
        this.operation++;
        _array[j + 1] = _array[j];
        _array[j] = currentValue;

      }
    }
    return _array;
  }

  //Missing optimization on decending order and random?
  quickSort(array){

    let _array = [...array];
    let indexLock = [];
    let min = 0;
    let max = _array.length - 1;
    
    let compareIndex = min;
    let pivot = max;

    this.operation = 0;

    while(min != max){
      for(let i = min; i <= pivot; i++){
        this.operation++;
        if(this.#getCompare(_array[pivot], _array[i])){
          let e = _array[compareIndex];
          _array[compareIndex] = _array[i];
          _array[i] = e;
          compareIndex++;
        }
      }

      this.operation++;
      compareIndex--;
      indexLock[compareIndex] = true;

      if(compareIndex == max){
        max--;
      }

      let rightHit = false;
      if(compareIndex - 1 > 0 && indexLock[compareIndex - 1] != true){
        pivot = compareIndex - 1;
        rightHit = true;
      } else {
        pivot = max;
      }

      let leftHit = false;
      for(let i = min; i < max; i++){
        this.operation++;
        if(leftHit == false){
          if(indexLock[i] != true){
            min = i;
            leftHit = true;
            if(rightHit == true){
              break;
            }
          }
        } else if(indexLock[i] == true && indexLock[i - 1] != true){
          pivot = i - 1;
          break;
        }
      }
      compareIndex = min;
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