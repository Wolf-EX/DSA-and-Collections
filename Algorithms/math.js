export class MathUtil{

  constructor(){

  }

  getRandomInt = function(maxInt) {

    return ~~(Math.random() * maxInt);
  }

  mod = function(n, d) {

    return ((n % d) + d) % d;
    // return -(Math.floor(n / d) * d - n);
  }

  lerp = function(a, b, t) {
    return a + (b - a) * t;
  }

  // Squareroot without built in functions
  sqrt = function(n, precision = .00001) {
    let iterations = 0;

    if(n < 0) {
      return NaN;
    }

    let x = this.getNearestPerfectSquare(n);
    let y = (n / x);

    if(x === y) {
      return x;
    }

    do {
      x = (x + y) / 2;
      y = (n / x);
      iterations++;
    } while ((n / y) - y > precision);
    
    console.log('iterations', iterations);
    return y;
  }

  getNearestPerfectSquare = function(n) {
    let r = 2;
    while (r ** 2 < n) {
      r++;
    }
    if(r === n) {
      return r;
    }
    const l = r - 1;
    return Number((n - (l ** 2) < (r ** 2) - n) ? l : r);
  }
}
