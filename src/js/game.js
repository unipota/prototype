import './Settings'
import Drawer from './Drawer'
import Input from './Input'
import Scene from './Scene'
import TitleScene from './Scene/TitleScene'

class Game {
  static async start() {
    Drawer.init()
    Input.init()
    Scene.init()
    await Drawer.load()
    console.log('Assets loaded')

    Scene.push(new TitleScene())
    Game.run()
  }
  static run() {
    Drawer.drawAll()
    Scene.update()
    requestAnimationFrame(Game.run)
  }
}

document.addEventListener('DOMContentLoaded', Game.start())
