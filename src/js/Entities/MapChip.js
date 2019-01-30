import BaseEntity from './baseEntity'
import Drawer from 'js/drawer'

export default class MapChip extends BaseEntity {
  constructor({ camera, id, x, y }) {
    super()
    this.sprite = Drawer.makeSprite(Drawer.textures.mapChip[id])
    this.sprite.x = x
    this.sprite.y = y
    camera.addChild(this.sprite)
  }
  destroy() {
    this.sprite.destroy()
  }
}
