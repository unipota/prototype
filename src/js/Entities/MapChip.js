import BaseEntity from './BaseEntity'
import Drawer from 'js/Drawer'

export default class MapChip extends BaseEntity {
  constructor({ scene, id, x, y }) {
    super()
    this.sprite = Drawer.makeSprite(Drawer.textures.mapChip[id])
    this.sprite.x = x
    this.sprite.y = y
    scene.stage.addChild(this.sprite)
  }
}
