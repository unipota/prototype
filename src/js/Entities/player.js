import BaseEntity from './baseEntity'
import Drawer from '../drawer'
import Input from '../input'
import { keyCodes } from '../Config/keyConfig'
import Assets from '../assets'

export default class Player extends BaseEntity {
  constructor({ camera, x, y }) {
    super()
    this.state = {
      direction: 'down',
      behavior: 'stand'
    }
    this.sprite = Drawer.makeSprite(Assets.textures.mychara.stand.down)
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

    this.updateState()
    this.updateTexture()

    this.moveCamera()
  }
  updateState() {
    switch (this.state.behavior) {
      case 'stand':
        if (Input.isKeyPressed(keyCodes.UP)) {
          this.state.direction = 'up'
        }
        if (Input.isKeyPressed(keyCodes.DOWN)) {
          this.state.direction = 'down'
        }
        if (Input.isKeyPressed(keyCodes.LEFT)) {
          this.state.direction = 'left'
        }
        if (Input.isKeyPressed(keyCodes.RIGHT)) {
          this.state.direction = 'right'
        }
        break
      case 'run':
        break
    }
  }
  updateTexture() {
    switch (this.state.behavior) {
      case 'stand':
        switch (this.state.direction) {
          case 'down':
            this.sprite.texture = Assets.textures.mychara.stand.down
            break
          case 'up':
            this.sprite.texture = Assets.textures.mychara.stand.up
            break
          case 'left':
            this.sprite.texture = Assets.textures.mychara.stand.left
            break
          case 'right':
            this.sprite.texture = Assets.textures.mychara.stand.right
            break
        }
        break
      case 'run':
        break
    }
  }
  moveCamera() {
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
    }
    if (Input.isKeyPressed(keyCodes.UP)) {
      this.vel.y -= 0.08
    }
    if (Input.isKeyPressed(keyCodes.RIGHT)) {
      this.vel.x += 0.08
    }
    if (Input.isKeyPressed(keyCodes.DOWN)) {
      this.vel.y += 0.08
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
