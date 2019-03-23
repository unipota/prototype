import baseEntity from './baseEntity'
import Drawer from '../drawer'
import Assets from '../assets'
import { Collider, RectCollider } from '../collider'
import { COLLISIONS } from '../Params/params'

export default class ExitArea extends baseEntity {
  constructor({ x, y }) {
    super()
    this.sprite = Drawer.makeSprite(Assets.textures.mapChip[2])
    this.sprite.x = x
    this.sprite.y = y
    this.width = 96
    this.height = 32

    this.collider = new Collider()
    this.exitCollider = new RectCollider({ width: this.width, height: this.height })
    this.exitCollider.padding = { top: 0, left: 0, right: 0, bottom: 0 }
    this.collider.addCollider({
      collider: this.exitCollider,
      key: COLLISIONS.EXIT
    })
  }
  getCollider({ key }) {
    return this.collider.getCollider({ key, x: this.position.x, y: this.position.y })
  }
  get position() {
    return this.sprite.position
  }
  hit() {}
}
