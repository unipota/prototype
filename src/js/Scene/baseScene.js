import Scene from 'js/scene'
import Input from 'js/input'
import Drawer from 'js/drawer'
import Timer from 'js/timer'
import Sound from 'js/sound'

export default class BaseScene {
  constructor() {
    Sound.stopAll()
    Input.reset()
    Timer.resetScale()
    this.stage = new PIXI.Container()
    Drawer.addToRoot(this.stage)
  }
  push(scene) {
    Scene.push(scene)
  }
  pop() {
    Drawer.removeFromRoot(this.stage)
    this.stage.destroy()
    Scene.pop()
  }
  update() {}
}
