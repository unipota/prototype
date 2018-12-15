import * as PIXI from 'pixi.js'

export default class Drawer {
  static init () {
    this.renderer = PIXI.autoDetectRenderer({
      width: 400,
      height: 400,
      backgroundColor: 0xffffff
    })
    this.loader = PIXI.loader
    this.rootStage = new PIXI.Container()
    
    document.body.appendChild(this.renderer.view)
    console.log('Drawer init')
  }
  static load () {
    return new Promise(resolve => {
      this.loader.onComplete.add(resolve)
      this.loader
        .add('./assets/img/chara.json')
        .load(() => Drawer.onLoaded())
    })
  }
  static onLoaded () {
    this.textures = {
      'mychara': {
        'down': PIXI.Texture.fromFrame('chara0'),
        'up': PIXI.Texture.fromFrame('chara3'),
        'left': PIXI.Texture.fromFrame('chara1'),
        'right': PIXI.Texture.fromFrame('chara2')
      }
    }
  }
  static makeSprite (defaultTexture) {
    return new PIXI.Sprite(defaultTexture)
  }
  static addToRoot (sprite) {
    this.rootStage.addChild(sprite)
  }
  static drawAll () {
    this.renderer.render(this.rootStage)
  }
}