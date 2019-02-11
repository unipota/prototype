import * as PIXI from 'pixi.js'
import Assets from './assets'

export default class Drawer {
  static init() {
    this.width = 640
    this.height = 480
    this.renderer = PIXI.autoDetectRenderer({
      width: this.width,
      height: this.height,
      backgroundColor: 0xffffff
    })
    this.loader = PIXI.loader
    this.rootStage = new PIXI.Container()

    document.getElementById('app').appendChild(this.renderer.view)
    console.log('Drawer init')
  }
  static load() {
    return new Promise(resolve => {
      this.loader.onComplete.add(resolve)
      Assets.fileNames.forEach(f => {
        this.loader.add(require(`../assets/json/${f}`))
      })
      this.loader.load(() => Assets.makeTextureFromFrame())
    })
  }
  static makeSprite(defaultTexture) {
    return new PIXI.Sprite(defaultTexture)
  }
  static addToRoot(target) {
    this.rootStage.addChild(target)
  }
  static removeFromRoot(target) {
    this.rootStage.removeChild(target) //indexで削除できるようにする
  }
  static drawAll() {
    this.renderer.render(this.rootStage)
  }
}
