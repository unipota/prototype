import Player from './Entity/player'

export default class SceneManager {
  static init () {
    console.log('SceneManager init')
  }
  static main () {
    this.currentScene = new MainScene()
  }
  static update () {
    this.currentScene.update()
  }
}

class MainScene {
  constructor () {
    this.entities = []
    this.entities.push(new Player())
    console.log('MainScene created')
  }
  update () {
    this.entities.forEach(
      e => {
        e.update()
      }
    )
  }
}