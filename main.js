import { TimeComponent } from "./src/components/component.js";
import AssetManager, { ASSET_PATHS } from "./src/systems/assetManager.js";
import InputManager from "./src/systems/inputManager.js";
import { World } from "./src/world/world.js";

// var canvas = document.getElementById("world");
// var ctx = canvas.getContext("2d");

// ctx.fillStyle = "#00bf30"
// ctx.fillRect(0, 0, canvas.width, canvas.height)

// var claraimg = new Image();
// claraimg.src = "clara.png";
// var claraIsLoaded = false
// claraimg.onload = function() {
//   claraIsLoaded = true;
//   ctx.drawImage(claraimg, x, y, 50, 50);
// }

// var x = 100, y = 100;
// //ctx.fillStyle = "pink";
// //ctx.fillRect(x, y, 50, 50)

// canvas.addEventListener("keydown", function(e) {
//   if (e.code === "ArrowRight") {
//     x += 10;
//   } else if(e.code === "ArrowLeft"){
//     x -= 10;
//   }else if(e.code === "ArrowUp"){
//     y -= 10;
//   }else if(e.code === "ArrowDown"){
//     y += 10;
//   }

//   if(claraIsLoaded){
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillRect(0, 0, canvas.width, canvas.height)
//     ctx.drawImage(claraimg, x, y, 50, 50);
//     ctx.restore();
//   }
// })



export class Sim {
  constructor(){
    this.ASSET_MANAGER = null;
    this.INPUT_MANAGER = null;
    this.TIME = null;
    this.RENDERER = null;
    this.WORLD = null;

    
    this.ENTITY_MANAGER = null;
    this.CAMERA = null;
    this.COLLISION = null;
    this.LOGGER = null;
    
    this.rAF = null;
    this.runLoop.bind(this);

    this._diag = {
      frameRate : 0,
      isDebug : true,
    }
  }
  build(){
    this.ASSET_MANAGER = new AssetManager();
    this.INPUT_MANAGER = new InputManager();
    this.TIME = new TimeComponent();
    this.RENDERER = new Renderer();
    
    this.buildLoop();
  }

  buildLoop(){
    var isDone = false

    //check if assets are done loading
    isDone = this.ASSET_MANAGER.isDone();

    //build world and start runloop if done, else reloop build
    if(isDone){
      this.WORLD = new World(this);
      this.rAF = window.requestAnimationFrame(this.runLoop.bind(this));
    } else {
      this.rAF = window.requestAnimationFrame(this.buildLoop.bind(this));
    }
  }

  runLoop(){ //TODO: Check framerate to prevent draw on every frame
    let dt = this.TIME.tick()
    this._diag.frameRate = 1 / dt;
    this.update(dt);

    this.rAF = window.requestAnimationFrame(this.runLoop.bind(this));
  }


  update(dt){
    this.WORLD.update(dt)
    this.RENDERER.clear()
    this.WORLD.draw()
    this.RENDERER.restore()
  }
}

export class Renderer{
  constructor(){
    this.canvas = document.getElementById("world");
    this.CTX = this.canvas.getContext("2d");
    //camera?

  }
  renderEntity(entity){
    this.CTX.drawImage(entity.image, entity.x, entity.y, entity.width, entity.height);
  }

  drawLine(start, end, style){
    this.CTX.beginPath();
    this.CTX.strokeStyle = style;
    this.CTX.moveTo(start.x, start.y);
    this.CTX.lineTo(end.x, end.y);
    this.CTX.stroke();
  }

  drawImage(image, x, y, width, height){
    this.CTX.drawImage(image, x, y, width, height);
  }

  clear(){
    this.CTX.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.CTX.save();
  }

  restore(){
    this.CTX.restore();
  }

}

var sim = new Sim();
sim.build();