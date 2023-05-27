//inspired by victor.js

export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  length() {
    let lenSq = this.x * this.x + this.y * this.y;
    return Math.sqrt(lenSq);
  }



  addX(vec){
    this.x += vec.x
    return this
  }
  addY(vec){
    this.y += vec.y
    return this
  }
  add(vec) {
    this.y += vec.y;
    this.x += vec.x;
    return this
  }
  subtractX(vec){
    this.x -= vec.x
    return this
  }
  subtractY(vec){
    this.y -= vec.y
    return this
  }
  subtract(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this
  }
  divide(vec){
    this.x /= vec.x;
    this.y /= vec.y;
    return this
  }

  distance(vec){
    return Math.sqrt(this.distanceSq(vec))
  }
  distanceX(vec){
    return this.x - vec.x
  }
  distanceY(vec){
    return this.y - vec.y
  }
  distanceSq(vec){
    var dx = this.distanceX(vec), dy = this.distanceY(vec);
    return dx * dx + dy * dy;
  }

  multiplyScalar(scalar){
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  normalize(vec){
    var len = this.length();
    if(len === 0){
      this.x = 1;
      this.y = 0;
    }else{
      this.divide({x: len, y: len})
    }
    return this
  }

  // verticalAngle(vec){
  //   return Math.a
  // }

  static fromObject(obj){
    return new Vector(obj.x, obj.y)
  }

  //extra helpers?
  magnitude() {
    return this.length();
  }
  isZero(){
    return this.x === 0 && this.y === 0
  }
}
