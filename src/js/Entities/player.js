import BaseEntity from './baseEntity'
import Drawer from '../drawer'
import Input from '../input'
import { keyCodes } from '../Config/keyConfig'
import Assets from '../assets'

export default class Player extends BaseEntity {
  constructor({ camera, x, y }) {
    super()
    this.sprite = Drawer.makeSprite(Assets.textures.mychara.down)
    this.sprite.x = x
    this.sprite.y = y
    this.camera = camera
    camera.addChild(this.sprite)

    this.acc = {
      x: 0,
      y: 0
    }
    this.vel = {
      x: 0,
      y: 0
    }
  }
  update() {
    this.moveByInput()
    this.resistVelocity()
    this.limitVelocity()
    this.applyVelocity()

    const targetX = this.sprite.x + this.sprite.width / 2
    const targetY = this.sprite.y + this.sprite.height / 2

    this.camera.pivot.x =
      (targetX - this.camera.pivot.x) * 0.06 + this.camera.pivot.x
    this.camera.pivot.y =
      (targetY - this.camera.pivot.y) * 0.06 + this.camera.pivot.y
  }
  moveByInput() {
    if (Input.isKeyPressed(keyCodes.LEFT)) {
      this.vel.x -= 0.08
      this.sprite.texture = Assets.textures.mychara.left
    }
    if (Input.isKeyPressed(keyCodes.UP)) {
      this.vel.y -= 0.08
      this.sprite.texture = Assets.textures.mychara.up
    }
    if (Input.isKeyPressed(keyCodes.RIGHT)) {
      this.vel.x += 0.08
      this.sprite.texture = Assets.textures.mychara.right
    }
    if (Input.isKeyPressed(keyCodes.DOWN)) {
      this.vel.y += 0.08
      this.sprite.texture = Assets.textures.mychara.down
    }
  }
  limitVelocity() {
    this.vel.x =
      this.vel.x > 0 ? Math.min(this.vel.x, 1) : Math.max(this.vel.x, -1)
    this.vel.y =
      this.vel.y > 0 ? Math.min(this.vel.y, 1) : Math.max(this.vel.y, -1)
  }
  resistVelocity() {
    this.vel.x =
      Math.abs(this.vel.x) < 0.05
        ? 0
        : this.vel.x > 0
        ? this.vel.x - 0.03
        : this.vel.x < 0
        ? this.vel.x + 0.03
        : this.vel.x
    this.vel.y =
      Math.abs(this.vel.y) < 0.05
        ? 0
        : this.vel.y > 0
        ? this.vel.y - 0.03
        : this.vel.y < 0
        ? this.vel.y + 0.03
        : this.vel.y
  }
  applyVelocity() {
    this.sprite.x += this.vel.x
    this.sprite.y += this.vel.y
  }
  destroy() {
    this.sprite.destroy()
  }
}
