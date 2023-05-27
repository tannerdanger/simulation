export default class ECS {
  constructor() {
    this._ID = crypto.randomUUID();
    this._TYPE = this.types.UNDEFINED;
    this.components = []
  }
  update(dt){}
  draw(ctx){}

  getID(){
    return String(this._TYPE + "::" + this.constructor.name + "::" + this._ID)
  }

  addComponent(component){
    if(this.components.includes(component)){
      console.warn("Component already exists on this entity.")
    }else{
      component.parent = this;
      this.components.push(component);
    }
    return component;
  }

  types = {
    COMPONENT : "COMPONENT",
    ENTITY : "ENTITY",
    SYSTEM : "SYSTEM",
    UNDEFINED : "UNDEFINED",
  }
}