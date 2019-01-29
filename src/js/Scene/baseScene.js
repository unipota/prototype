import Scene from 'js/Scene'
import Input from 'js/Input'
import Drawer from 'js/Drawer'

export default class BaseScene {
  constructor() {
    Input.resetKeys()
    this.stage = new PIXI.Container()
    Drawer.addToRoot(this.stage)
  }
  push(scene) {
    Scene.push(scene)
  }
  pop() {
    Drawer.removeFromRoot(this.stage)
    Scene.pop()
  }
  update() {}
}
