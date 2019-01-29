import BaseEntity from './BaseEntity'
import Drawer from 'js/Drawer'

export default class MapChip extends BaseEntity {
  constructor({ camera, id, x, y }) {
    super()
    this.sprite = Drawer.makeSprite(Drawer.textures.mapChip[id])
    this.sprite.x = x
    this.sprite.y = y
    camera.addChild(this.sprite)
  }
}
