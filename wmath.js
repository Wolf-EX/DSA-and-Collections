export class WMath{

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

  /*bounceOut(t){
    const n1 = 7.5625;
    const d1 = 2.75;

    let x = t;

    if(x < 1.0 / d1){
      return n1 * x * x;
    } else if (x < 2.0 / d1){
      x -= 1.5 / d1;
      return n1 * x * x + 0.75;
    } else if (x < 2.5 / d1){
      x -= 2.25 / d1;
      return n1 * x * x + 0.9375;
    } else {
      x -= 2.625 / d1;
      return n1 * x * x + 0.984375;
    }
  } */

}