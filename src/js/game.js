import './settings'
import Drawer from './drawer'
import InputManager from './input'
import SceneManager from './scene'

class Game {
  static async start () {
    Drawer.init()
    InputManager.init()
    SceneManager.init()
    await Drawer.load()

    SceneManager.main()
    Game.run()
  }
  static run () {
    Drawer.drawAll()
    SceneManager.update()
    requestAnimationFrame(Game.run)
  }
}

Game.start()

