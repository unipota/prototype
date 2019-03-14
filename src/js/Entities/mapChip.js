import BaseEntity from './baseEntity'
import Drawer from 'js/drawer'
import Assets from '../assets'

export default class mapChip extends BaseEntity {
  constructor({ id, x, y }) {
    super()
    this.sprite = Drawer.makeSprite(Assets.textures.mapChip[id])
    this.sprite.scale = new PIXI.Point(2, 2)
    this.sprite.x = x
    this.sprite.y = y
    this.width = 64
    this.height = 64
  }
  set index(val) {
    this._index = val
  }
  addToLayer(stage) {
    stage.addChild(this.sprite)
  }
  update() {}
  destroy() {
    this.sprite.destroy()
  }
}
