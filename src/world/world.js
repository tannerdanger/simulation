import { ASSET_PATHS } from "../systems/assetManager.js";
import { Entity, Person } from "./entity.js";
import ECS from "../../ecs.js"

export class World extends ECS{
  constructor(sim){
    super();
    this.SIM = sim;

    this.x = 100, this.y = 100;

    this.clara = this.SIM.ASSET_MANAGER.getAsset(ASSET_PATHS.CLARA);

    let entity = new Person()

  }

  /**
   * The change in time since the last update call
   * @param {float} dt
   */
  update(dt){
    if(this.SIM.INPUT_MANAGER.isMoveRight()){
      this.x += 10;
    }
    else if(this.SIM.INPUT_MANAGER.isMoveLeft()){
      this.x -= 10;
    }
    if(this.SIM.INPUT_MANAGER.isMoveUp()){
      this.y -= 10;
    }else if(this.SIM.INPUT_MANAGER.isMoveDown()){
      this.y += 10;
    }
  }

  draw(){
    this.SIM.RENDERER.drawImage(this.clara, this.x, this.y, 50, 50);
  }
}