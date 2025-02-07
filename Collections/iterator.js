export class Iterator{

  constructor(array, index = 0){
    if(array.length < index){
      throw `Exception thrown: IndexOutOfBoundException: Index: ${index}, Size: ${array.length}`;
    }
    this.index = index;
    this.array = array;
  }

  next(){
    let array = this.array[this.index];
    this.index++;
    return array;
  }

  hasNext(){
    return (this.index < this.array.length);
  }

  remove(){
    this.index--;
    this.array.splice(this.index, 1);
  }
}