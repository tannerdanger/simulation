import Vector from '../../utils/vector.js'



export default class InputManager{
  constructor(){
    this.downKeys = {};
    this.mousePos = null;
    this.clickType = this.clickTypes.NONE;
    this.clickPos = null;
    this.registerListeners();
  }

  isDone(){
    const canvas = document.getElementById("world");
    if(canvas.onkeydown === null){
      this.registerListeners();
      return false
    }
    return true;
  }

  /**
   * 
   * @param {KeyboardEvent] key
   * @returns
   */
  isPressed(key){
    return this.downKeys[key];
  }

  

  registerListeners(){
    const canvas = document.getElementById("world");

    //register left click
    canvas.onclick = (e) => {
      this.clickType = this.clickTypes.LEFT;
      this.clickPos = new Vector(e.clientX, e.clientY);
    }

    //register right click
    canvas.oncontextmenu = (e) => {
      this.clickType = this.clickTypes.RIGHT;
      this.clickPos = new Vector(e.clientX, e.clientY);
    }

    //keydown
    canvas.onkeydown = (e) => {
      this.downKeys[e.code] = true;
    }

    //keyup
    canvas.onkeyup = (e) => {
      delete this.downKeys[e.code]; //TODO: Delete extreme?
    }

    //mousemove
    canvas.onmousemove = (e) => {
      this.mousePos = new Vector(e.clientX, e.clientY);
    }
  }

  //TODO: Configure keys and game events
  isMoveLeft(){
    return this.isPressed('ArrowLeft') || this.isPressed('KeyA');
  }
  isMoveRight(){
    return this.isPressed('ArrowRight') || this.isPressed('KeyD');
  }

  isMoveUp(){
    return this.isPressed('ArrowUp') || this.isPressed('KeyW');
  }

  isMoveDown(){
    return this.isPressed('ArrowDown') || this.isPressed('KeyS');
  }

  clickTypes = {
    LEFT : "LEFT",
    RIGHT : "RIGHT",
    MIDDLE : "MIDDLE",
    NONE : "NONE"
  }
}