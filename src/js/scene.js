import MainScene from './Scene/mainScene'
import TitleScene from './Scene/titleScene'

export default class Scene {
  static init () {
    this.scenes = []
    console.log('SceneManager init')
  }
  static push (sceneTitle) {
    this.currentScene = new MainScene()
  }
  static update () {
    this.currentScene.update()
  }
}
