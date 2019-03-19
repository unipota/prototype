import BaseEntity from './baseEntity'
import Drawer from '../drawer'
import Assets from '../assets'
import { LAYERS, COLLISIONS } from '../Params/params'
import { Collider, RectCollider } from '../collider'

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

    this.collider = new Collider()
    const bulletCollider = new RectCollider({ width: this.width, height: this.height })
    bulletCollider.padding = {
      top: 4,
      left: 4,
      right: 4,
      bottom: 4
    }
    this.collider.addCollider({
      collider: bulletCollider,
      key: COLLISIONS.BULLET
    })
  }
  getCollider({ key }) {
    return this.collider.getCollider({ key, x: this.position.x, y: this.position.y })
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
    if (
      this.scene.stageWidth < this.position.x ||
      this.scene.stageHeight < this.position.y ||
      0 > this.position.x + this.width ||
      0 > this.position.y + this.height
    ) {
      this.scene.entityManager.removeEntity({ entity: this, layerKey: LAYERS.ENEMY_BULLET })
    }
  }
  hit() {
    this.scene.entityManager.removeEntity({ entity: this, layerKey: LAYERS.ENEMY_BULLET })
  }
  destroy() {
    this.sprite.destroy()
  }
}
