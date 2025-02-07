import { LinkedList } from "../List/linkedlist.js";
import { Map } from "./map.js";

export class HashMap extends Map{

  constructor(...arg){
    super();

    this.table = [];
    this.capacity = 16;
    this.loadFactor = 0.75;

    this.#deleteKeyFromArray;

    if(arg[0]){
      if(Map.prototype.isPrototypeOf(arg[0])){
        //Map passed
        let c = Math.floor(arg[0].array.length / (this.capacity * this.loadFactor));
        this.capacity = Math.pow(2, c + 4);
        arg[0].array.forEach(e =>{
        this.put(e[0], e[1]);
      });
      } else if(typeof arg[0] === "number"){
        this.capacity = arg[0];
        if(arg[1] && typeof arg[1] === "number"){
          this.loadFactor = arg[1];
        }
      }
    }

    //default string hashcode
    if(!Object.hasOwn(String.prototype, 'hashCode')){
      String.prototype.hashCode = function() {

        let fromIndex = 0;
        let a = this.split('');
        let end = fromIndex + a.length;
        let result = 0;
    
        for (let i = fromIndex; i < end; i++) {
            result = 31 * result + a[i].charCodeAt();
        }
        return result;
      }
    }

    //default string equals
    if(!Object.hasOwn(String.prototype, 'equals')){
      String.prototype.equals = function(i) {
        return this === i[0];
      }
    }

    //default number hashcode
    if(!Object.hasOwn(Number.prototype, 'hashCode')){
      Number.prototype.hashCode = function() {
        return this;
      }
    }

    //default number equals
    if(!Object.hasOwn(Number.prototype, 'equals')){
      Number.prototype.equals = function(i) {
        return this === i[0];
      }
    }
  }

  put(key, value){

    let hash = key.hashCode();
    let index = hash & (this.capacity - 1);
    let check = this.table[index];
    if(check === undefined){
      this.table[index] = new LinkedList();
      this.table[index].add([key, value]);
      this.array.push([key, value]);
      this.array.sort((i1, i2) => {
        let i1Index = i1[0].hashCode() & (this.capacity - 1);
        let i2Index = i2[0].hashCode() & (this.capacity - 1);
        if(i1Index < i2Index) return -1;
        if(i1Index > i2Index) return 1;
        return 0;
      });
    } else{
      let checkIndex = check.indexOf(key);
      if(checkIndex != -1){
        let val = check.get(checkIndex)[1];
        this.array.some(e => {
          if(e[0] == key){
            e[1] = value;
            return true;
          }
        });
        check.get(checkIndex)[1] = value;
        return val
      } else{
        check.add([key, value]);
        this.array.push([key, value]);
        this.array.sort((i1, i2) => {
          let i1Index = i1[0].hashCode() & (this.capacity - 1);
          let i2Index = i2[0].hashCode() & (this.capacity - 1);
          if(i1Index < i2Index) return -1;
          if(i1Index > i2Index) return 1;
          return 0;
        });
      }
    }

    if(this.array.length >= this.capacity * this.loadFactor){
      let tempArray = this.array;
      this.array = [];
      this.table = [];
      let c = Math.floor(tempArray.length / (16 * this.loadFactor));
      this.capacity = Math.pow(2, c + 4);
      tempArray.forEach(e =>{
        this.put(e[0], e[1]);
      });
    }
  }

  putAll(map){
    
    if(Map.prototype.isPrototypeOf(map)){
      map.forEach((key, value) =>{
        this.put(key, value);
      })
    }
  }

  get(key){

    let hash = key.hashCode();
    let index = hash & (this.capacity - 1);
    let check = this.table[index];
    if(check === undefined){
      //console.log(`key ${key} not found`);
      return undefined;
    } else{
      let checkIndex = check.indexOf(key);
      if(checkIndex == -1){
        //console.log(`key ${key} not found`);
        return undefined;
      } else{
        return check.get(checkIndex)[1];
      }
    }
  }

  remove(key){

    if(!key){
      throw "error: no suitable method found for remove(no arguments)\n\n"+
      " method HashMap.remove(Object) is not applicable\n" +
      "   (actual and formal argument lists differ in length)\n" +
      "1 error"
    }
    let hash = key.hashCode();
    let index = hash & (this.capacity - 1);
    let check = this.table[index];
    if(check === undefined){
      //console.log(`key ${key} not found`);
      return null;
    } else{
      let checkIndex = check.indexOf(key);
      if(checkIndex == -1){
        //console.log(`key ${key} not found`);
        return null;
      } else{
        let deleted = check.remove(check.indexOf(key));
        this.#deleteKeyFromArray(index, key);
        return deleted[1];
      }
    }
  }

  containsKey(key){

    let check = this.table[key.hashCode() & (this.capacity - 1)];
    return (check && check.indexOf(key) != -1) ? true : false;
  }

  containsValue(value){

    let contains = false;

    //some() has a time complexity of O(n) so I assume it iterates through whole list
    this.array.some(e => {
      if(e[1] === value){
        contains = true;
        return true;
      }
    });

    return contains
  }

  compute(key, remappingCallback){

    let value = this.get(key);
    let remap = remappingCallback(key, value);
    if(remap){
      this.put(key, remap);
    } else {
      this.remove(key);
    }
  }

  computeIfAbsent(key, remappingCallback){

    let value = this.get(key);
    if(value === undefined){
      let remap = remappingCallback(key, value);
      this.put(key, remap);
    }
  }

  computeIfPresent(key, remappingCallback){

    let value = this.get(key);
    if(value){
      let remap = remappingCallback(key, value);
      if(remap){
        this.put(key, remap);
      } else {
        this.remove(key);
      }
    }
  }

  clear(){
    this.array.length = 0;
    this.table.length = 0;
  };

  clone(){
    return this;
  }

  isEmpty(){
    return this.array.length == 0;
  }

  size(){
    return this.array.length;
  }

  keySet(){

    let keys = [];
    this.array.forEach(e => {
      keys.push(e[0]);
    });
    
    return keys;
  }

  entrySet(){
  
    return this.array;
  }

  toString(){
    
    let string = "{";
    this.array.forEach(e => {
      string += e[0] + "=" + e[1] + ", ";
    })
    string = string.substring(0, Math.max(string.length - 2, 1));
    string +="}";
    return string;
  }


  //Helper functions
  #deleteKeyFromArray(e, key){
    //console.log("e: " + e);
    let o = Math.log2(this.array.length); //max number of iterations - time complexity
    let l = Math.floor(this.array.length / 2);
    let index = l;
    let tableIndex;
    for(let i = 0; i <= o; i++){
      tableIndex = (this.array[index][0].hashCode() & (this.capacity - 1));
      if(tableIndex == e){
        if(this.array[index][0] == key){
          this.array.splice(index, 1);
          return;
        } else {
          let ln = 1;
          let ls = 1;
          while (ln != 0 && ls != 0){
            if(ln){
              if(this.array[index + ln][0] == key){
                this.array.splice(index + ln, 1);
                return;
              } else if(tableIndex == e){
                ln++
              } else {
                ln = 0;
              }
            }
            if(ls){
              if(this.array[index - ls][0] == key){
                this.array.splice(index - ls, 1);
                return;
              } else if(tableIndex == e){
                ls++
              } else {
                ls = 0;
              }
            }
          }
        }
      } else if(tableIndex > e){
        l -= Math.floor(l / 2);
        index -= l;
      } else {
        l -= Math.floor(l / 2);
        index += l;
      }
    }
    return null;
  }
}