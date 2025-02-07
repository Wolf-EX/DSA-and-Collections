export class MathUtil{

  constructor(){

  }

  getRandomInt = function(maxInt){

    return Math.floor(Math.random() * maxInt);
  }

  mod = function(n, d){

    return ((n % d) + d) % d;
    //return -(Math.floor(n / d) * d - n);
  }

  lerp = function(a, b, t){
    return a + (b - a) * t;
  }
}