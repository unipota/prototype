import BaseEntity from './baseEntity'
import Drawer from '../drawer'
import Assets from '../assets'

export default class Chestnut extends BaseEntity {
  constructor({ x, y }) {
    super()
    this.sprite = Drawer.makeSprite(Assets.textures.item.chestNut[0])
    this.sprite.x = x
    this.sprite.y = y
  }
  destroy() {
    this.sprite.destroy()
  }
}
