import ECS from "../../ecs.js";

export class Component extends ECS{
  constructor(parent) {
    super();
    this.parent = parent;
    this._TYPE = this.types.COMPONENT;
  }
}
//??
export class Transform extends Component {
  constructor(parent) {
    super(parent);
    this.position = { x: 0, y: 0 };
    this.rotation = 0;
    this.scale = { x: 1, y: 1 };
  }
}

export class TimeComponent extends Component {
  constructor(parent) {
    super(parent);
    this._id = "TIME_COMPONENT::" + crypto.randomUUID();
    this.runTime = 0;
    this.lastUpdate = 0;
    this.delta = 0;
  }
  tick() {
    let now = performance.now();
    this.delta = (now - this.lastUpdate) / 1000;
    this.runTime += this.delta;
    this.lastUpdate = now;
    return this.delta;
  }
}