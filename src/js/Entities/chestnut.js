import BaseEntity from './baseEntity'
import Drawer from '../drawer'
import Assets from '../assets'
import { LAYERS, COLLISIONS } from '../Params/params'
import { Collider, RectCollider } from '../collider'

export default class Chestnut extends BaseEntity {
  constructor({ x, y, scene }) {
    super()
    this.sprite = Drawer.makeSprite(Assets.textures.item.chestnut[0])
    this.sprite.x = x
    this.sprite.y = y
    this.width = 32
    this.height = 32
    this.scene = scene
    // this.sprite.anchor.set(0.5)

    this.collider = new Collider()
    const itemCollider = new RectCollider({ width: this.width, height: this.height })
    itemCollider.padding = {
      top: 4,
      left: 4,
      right: 4,
      bottom: 4
    }
    this.collider.addCollider({
      collider: itemCollider,
      key: COLLISIONS.ITEM
    })
  }
  get position() {
    return this.sprite.position
  }
  getCollider({ key }) {
    return this.collider.getCollider({ key, x: this.position.x, y: this.position.y })
  }
  update() {}
  destroy() {
    this.sprite.destroy()
  }
  hit(target) {
    this.scene.entityManager.removeEntity({
      entity: this,
      layerKey: LAYERS.ITEM
    })
  }
}
