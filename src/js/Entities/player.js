import Entity from '../entity'
import Drawer from '../drawer'
import Input from '../input'
import KeyConfig from '../Config/keyConfig'

export default class Player extends Entity {
  constructor () {
    super()
    this.sprite = Drawer.makeSprite(Drawer.textures.mychara.down)
    Drawer.addToRoot(this.sprite)
    
    this.acc = {
      x: 0, y: 0
    }
    this.vel = {
      x: 0, y: 0
    }
  }
  update () {
    this.moveByInput()
    this.applyVelocity()
  }
  moveByInput () {
    if (Input.isKeyPressed(KeyConfig.left)) {
      this.sprite.x -= 1
      this.sprite.texture = Drawer.textures.mychara.left
    }
    if (Input.isKeyPressed(KeyConfig.up)) {
      this.sprite.y -= 1
      this.sprite.texture = Drawer.textures.mychara.up
    }
    if (Input.isKeyPressed(KeyConfig.right)) {
      this.sprite.x += 1
      this.sprite.texture = Drawer.textures.mychara.right
    }
    if (Input.isKeyPressed(KeyConfig.down)) {
      this.sprite.y += 1
      this.sprite.texture = Drawer.textures.mychara.down
    }
  }
  applyVelocity () {
    this.sprite.x += this.vel.x
    this.sprite.y += this.vel.y
  }
}