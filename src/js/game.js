import './settings'
import Drawer from './drawer'
import Input from './input'
import Scene from './scene'
import TitleScene from './Scene/titleScene'

class Game {
  static async start () {
    Drawer.init()
    Input.init()
    Scene.init()
    await Drawer.load()
    console.log('Assets loaded')

    Scene.push(new TitleScene)
    Game.run()
  }
  static run () {
    Drawer.drawAll()
    Scene.update()
    requestAnimationFrame(Game.run)
  }
}

document.addEventListener('DOMContentLoaded', Game.start())

