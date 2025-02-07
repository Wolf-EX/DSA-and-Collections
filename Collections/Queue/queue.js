import { Collection } from "../collection.js";

export class Queue extends Collection{
  
  constructor(...arg){
    super(...arg);
  }

  peek(){
    return this[0];
  }

  poll(){
    return this.shift();
  }
}