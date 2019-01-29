import Entity from '../entity'
import Drawer from '../drawer'
import Input from '../input'
import KeyConfig from '../Config/keyConfig'

export default class Player extends Entity {
  constructor(scene) {
    super()
    this.sprite = Drawer.makeSprite(Drawer.textures.mychara.down)
    this.sprite.x = 100
    this.sprite.y = 100
    scene.stage.addChild(this.sprite)

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
  }
  moveByInput() {
    if (Input.isKeyPressed(KeyConfig.LEFT)) {
      this.vel.x -= 0.1
      this.sprite.texture = Drawer.textures.mychara.left
    }
    if (Input.isKeyPressed(KeyConfig.UP)) {
      this.vel.y -= 0.1
      this.sprite.texture = Drawer.textures.mychara.up
    }
    if (Input.isKeyPressed(KeyConfig.RIGHT)) {
      this.vel.x += 0.1
      this.sprite.texture = Drawer.textures.mychara.right
    }
    if (Input.isKeyPressed(KeyConfig.DOWN)) {
      this.vel.y += 0.1
      this.sprite.texture = Drawer.textures.mychara.down
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
      Math.abs(this.vel.x) < 0.1
        ? 0
        : this.vel.x > 0
        ? this.vel.x - 0.05
        : this.vel.x < 0
        ? this.vel.x + 0.05
        : this.vel.x
    this.vel.y =
      Math.abs(this.vel.y) < 0.1
        ? 0
        : this.vel.y > 0
        ? this.vel.y - 0.05
        : this.vel.y < 0
        ? this.vel.y + 0.05
        : this.vel.y
  }
  applyVelocity() {
    this.sprite.x += this.vel.x
    this.sprite.y += this.vel.y
  }
}
