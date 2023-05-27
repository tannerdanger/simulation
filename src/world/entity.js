import ECS from "../../ecs.js";
import { Component } from "../components/component.js"
import { ASSET_PATHS } from "../systems/assetManager.js";

export class Entity extends ECS{
  constructor(config){
    super()
    this._TYPE = this.types.ENTITY;

    Object.assign(this, default_entity_config)
    Object.assign(this, config)

    console.log(this.x)

  }


}

export class Person extends Entity {
  constructor(){
    super()
  }
}

export class SpriteComponent extends Component {
  constructor(parent) {
    super(parent);
    this.sprite = null;
  }
}

const default_entity_config = {
  x : 100,
  y : 100,
  imageSrc : ASSET_PATHS.CLEAR_32,
}