import BaseEntity from './baseEntity'
import Drawer from '../drawer'
import Assets from '../assets'
import { LAYERS, COLLISIONS } from '../Params/params'
import { Collider, RectCollider } from '../collider'
import Timer from '../timer'

export default class Chestnut extends BaseEntity {
  constructor({ x, y, scene }) {
    super()
    this.sprite = Drawer.makeSprite(Assets.textures.item.chestnut[0])
    this.sprite.x = x
    this.sprite.y = y
    this.uniqueRate = Math.random()
    this.scaleSize = Math.floor(this.uniqueRate * 20 + 32)
    this.sprite.width = this.scaleSize
    this.sprite.height = this.scaleSize
    this.width = this.scaleSize
    this.height = this.scaleSize
    this.scene = scene
    // this.sprite.anchor.set(0.5)
    this.isHitAbsorp = false
    this.absorpedTarget = null

    this.price = Math.floor(this.uniqueRate * 200 + 50)

    this.collider = new Collider()
    const itemCollider = new RectCollider({ width: this.width, height: this.height })
    itemCollider.padding = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
    this.collider.addCollider({
      collider: itemCollider,
      key: COLLISIONS.ITEM
    })
    this.collider.addCollider({
      collider: itemCollider,
      key: COLLISIONS.ITEM_ABSORP
    })
  }
  get position() {
    return this.sprite.position
  }
  getCollider({ key }) {
    return this.collider.getCollider({ key, x: this.position.x, y: this.position.y })
  }
  update() {
    if (this.isHitAbsorp) {
      this.moveToTarget(this.absorpedTarget)
    }
  }
  moveToTarget(target) {
    const targetX = target.position.x + target.width / 2
    const targetY = target.position.y + target.height / 2
    this.sprite.x = (targetX - this.sprite.x) * 0.1 * Timer.scale + this.sprite.x
    this.sprite.y = (targetY - this.sprite.y) * 0.1 * Timer.scale + this.sprite.y
  }
  destroy() {
    this.sprite.destroy()
  }
  hit({ target, colliderKey }) {
    switch (colliderKey) {
      case COLLISIONS.ITEM:
        this.scene.entityManager.removeEntity({
          entity: this,
          layerKey: LAYERS.ITEM
        })
        break
      case COLLISIONS.ITEM_ABSORP:
        if (this.isHitAbsorp) return
        this.isHitAbsorp = true
        this.absorpedTarget = target
        break
    }
  }
}
