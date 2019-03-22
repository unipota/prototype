import './settings'
import Drawer from './drawer'
import Sound from './sound'
import Input from './input'
import Scene from './scene'
import Assets from './assets'
import Text from './text'
import TitleScene from './Scene/titleScene'
import Timer from './timer'

class Game {
  static async start() {
    Drawer.init()
    Sound.init()
    Input.init()
    Scene.init()
    Assets.init()
    Text.init()
    Timer.init()
    await Drawer.loadAssets()
    await Sound.loadAssets()

    Scene.push(new TitleScene())
    PIXI.ticker.shared.add(Game.run)
  }
  static run(delta) {
    Drawer.drawAll()
    Scene.update(delta)
    Timer.incTime()
  }
}

document.addEventListener('DOMContentLoaded', Game.start())
