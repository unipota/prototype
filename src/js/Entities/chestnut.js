import BaseEntity from './baseEntity'
import Drawer from '../drawer'
import Assets from '../assets'
import { LAYERS } from '../Params/params'

export default class Chestnut extends BaseEntity {
  constructor({ x, y, scene }) {
    super()
    this.sprite = Drawer.makeSprite(Assets.textures.item.chestNut[0])
    this.sprite.x = x
    this.sprite.y = y
    this.width = 32
    this.height = 32
    this.scene = scene

    this.hitRectPadding = {
      top: 4,
      left: 4,
      right: 4,
      bottom: 4
    }
  }
  get position() {
    return this.sprite.position
  }
  get hitRectSize() {
    return {
      width: this.width - this.hitRectPadding.left - this.hitRectPadding.right,
      height: this.height - this.hitRectPadding.top - this.hitRectPadding.bottom
    }
  }
  get hitRectPosition() {
    return {
      x: this.sprite.x + this.hitRectPadding.left,
      y: this.sprite.y + this.hitRectPadding.top
    }
  }
  set index(val) {
    this._index = val
  }
  addToLayer(stage) {
    stage.addChild(this.sprite)
  }
  destroy() {
    this.sprite.destroy()
  }
  hit(target) {
    this.scene.entityManager.removeEntity({ index: this._index, layerKey: LAYERS.ITEM })
  }
}
