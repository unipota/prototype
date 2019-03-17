import BaseEntity from './baseEntity'
import Drawer from '../drawer'
import Assets from '../assets'
import { LAYERS } from '../Params/params'
import * as filters from 'pixi-filters'

export default class Bullet extends BaseEntity {
  constructor({ x, y, vec, scene }) {
    super()
    this.sprite = Drawer.makeSprite(Assets.textures.bullet[0])
    this.sprite.x = x
    this.sprite.y = y
    this.vec = vec
    this.scene = scene

    this.width = 32
    this.height = 32

    this.hitRectPadding = {
      top: 4,
      left: 4,
      right: 4,
      bottom: 4
    }
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
  get position() {
    return this.sprite.position
  }
  set index(val) {
    this._index = val
  }
  update() {
    this.sprite.x += this.vec.x
    this.sprite.y += this.vec.y
  }
  hit() {
    this.scene.entityManager.removeEntity({ entity: this, layerKey: LAYERS.ENEMY_BULLET })
  }
  destroy() {
    this.sprite.destroy()
  }
}
