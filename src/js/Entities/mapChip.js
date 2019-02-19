import BaseEntity from './baseEntity'
import Drawer from 'js/drawer'
import Assets from '../assets'

export default class mapChip extends BaseEntity {
  constructor({ camera, id, x, y }) {
    super()
    this.sprite = Drawer.makeSprite(Assets.textures.mapChip[id])
    this.sprite.x = x
    this.sprite.y = y
    camera.addChild(this.sprite)
  }
  destroy() {
    this.sprite.destroy()
  }
}
