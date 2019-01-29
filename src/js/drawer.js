import * as PIXI from 'pixi.js'

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
      this.loader
        .add(require('../assets/blanc.json'))
        .add(require('../assets/map1.json'))
        .load(() => Drawer.onLoaded())
    })
  }
  static onLoaded() {
    this.textures = {
      mychara: {
        down: PIXI.Texture.fromFrame('blanc 0.aseprite'),
        right: PIXI.Texture.fromFrame('blanc 1.aseprite'),
        up: PIXI.Texture.fromFrame('blanc 2.aseprite'),
        left: PIXI.Texture.fromFrame('blanc 3.aseprite')
      },
      mapChip: [PIXI.Texture.fromFrame('map1 0')]
    }
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
