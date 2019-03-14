import BaseEntity from './baseEntity'
import Drawer from '../drawer'
import Assets from '../assets'

export default class Chestnut extends BaseEntity {
  constructor({ x, y }) {
    super()
    this.sprite = Drawer.makeSprite(Assets.textures.item.chestNut[0])
    this.sprite.x = x
    this.sprite.y = y
    this.width = 32
    this.height = 32
  }
  get position() {
    return this.sprite.position
  }
  addToLayer(stage) {
    stage.addChild(this.sprite)
  }
  destroy() {
    this.sprite.destroy()
  }
  hit(target) {}
}
