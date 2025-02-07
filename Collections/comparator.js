export class Comparator{

  constructor(){}

  compare(){
    throw new Error(`Method 'compare' must be implemented in '${this.constructor.name}'.`);
  }
}