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
    // this.sprite.anchor.set(0.5)

    this.hitRectPadding = {
      top: 4,
      left: 4,
      right: 4,
      bottom: 4
    }

    this.hitFlag = false
    this.hitFrame = 0
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
  update() {
    if (this.hitFlag) {
      if (this.hitFrame <= 0) {
        this.scene.entityManager.removeEntity({ index: this._index, layerKey: LAYERS.ITEM })
        return
      }
      this.hitFrame--
      this.sprite.scale = new PIXI.Point(this.hitFrame / 20, this.hitFrame / 20)
    }
  }
  destroy() {
    this.sprite.destroy()
  }
  hit(target) {
    if (!this.hitFlag) {
      this.hitFrame = 20
    }
    this.hitFlag = true
    this.scene.entityManager.removeEntity({ index: this._index, layerKey: LAYERS.ITEM })
  }
}
