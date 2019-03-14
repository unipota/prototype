import './settings'
import Drawer from './drawer'
import Input from './input'
import Scene from './scene'
import Assets from './assets'
import TitleScene from './Scene/titleScene'

class Game {
  static async start() {
    Drawer.init()
    Input.init()
    Scene.init()
    Assets.init()
    await Drawer.loadAssets()

    Scene.push(new TitleScene())
    PIXI.ticker.shared.add(Game.run)
  }
  static run(delta) {
    Drawer.drawAll()
    Scene.update()
  }
}

document.addEventListener('DOMContentLoaded', Game.start())
