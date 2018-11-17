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
  static async load () {
    await new Promise(resolve => {
      this.loader.onComplete.add(resolve)
      this.loader
        .add('./assets/img/chara.json')
        .load(() => Drawer.onLoaded())
    })
    console.log('Resources loaded')
  }
  static onLoaded () {
    this.textures = []
    for(let i of ['chara0', 'chara1', 'chara2', 'chara3']) {
      this.textures.push(PIXI.Texture.fromFrame(i))
    }
    this.chara = new PIXI.Sprite(this.textures[0])
    this.rootStage.addChild(this.chara)
  }
  static drawAll () {
    this.renderer.render(this.rootStage)
  }
}