import Entity from '../entity'
import Drawer from '../drawer'
import Input from '../input'

export default class Player extends Entity {
  constructor () {
    super()
    this.sprite = Drawer.chara
  }
  update () {
    this.moveByInput()
  }
  moveByInput () {
    if (Input.isKeyPressed(37)) {
      this.sprite.x -= 1
      this.sprite.texture = Drawer.textures[1]
    }
    if (Input.isKeyPressed(38)) {
      this.sprite.y -= 1
      this.sprite.texture = Drawer.textures[3]
    }
    if (Input.isKeyPressed(39)) {
      this.sprite.x += 1
      this.sprite.texture = Drawer.textures[2]
    }
    if (Input.isKeyPressed(40)) {
      this.sprite.y += 1
      this.sprite.texture = Drawer.textures[0]
    }
  }
}