import './settings'
import Drawer from './drawer'
import Input from './input'
import Scene from './scene'

class Game {
  static async start () {
    Drawer.init()
    Input.init()
    Scene.init()
    await Drawer.load()
    console.log('Assets loaded')

    Scene.push('titleScene')
    Game.run()
  }
  static run () {
    Drawer.drawAll()
    Scene.update()
    requestAnimationFrame(Game.run)
  }
}

Game.start()

