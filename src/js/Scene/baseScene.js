import Scene from '../scene'
import Input from '../input'
import Drawer from '../drawer'

export default class BaseScene {
  constructor () {
    Input.resetKeys()
    this.stage = new PIXI.Container()
    Drawer.addToRoot(this.stage)
  }
  push (scene) {
    Scene.push(scene)
  }
  pop () {
    Drawer.removeFromRoot(this.stage)
    Scene.pop()
  }
  update () {
  }
}