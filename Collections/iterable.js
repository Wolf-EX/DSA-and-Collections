export class Iterable{
  constructor(){
    this.array = [];
  }

  forEach(consumer){

    for(let t in this.array){
      consumer.accept(t);
    }
  }

  iterator(){
    throw new Error(`Method 'iterator' must be implemented in '${this.constructor.name}'.`);
  }
}

export class Consumer{

  accept(t){};
}