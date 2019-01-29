export default class Scene {
  static init() {
    this.scenes = []
    console.log('SceneManager init')
  }
  static push(scene) {
    this.scenes.push(scene)
    console.log(this.scenes)
  }
  static pop() {
    this.scenes.pop()
  }
  static get currentScene() {
    return this.scenes[this.scenes.length - 1]
  }
  static update() {
    this.currentScene.update()
  }
}
