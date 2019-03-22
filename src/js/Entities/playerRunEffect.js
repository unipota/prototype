import baseEntity from './baseEntity'
import Drawer from '../drawer'
import Assets from '../assets'
import Timer from '../timer'
import { PARAMS, DIRECTION, BEHAVIOR } from './player'

export default class PlayerRunEffect extends baseEntity {
  constructor({ x, y }) {
    super()
    this.sprite = Drawer.makeSprite()
    this.sprite.scale = new PIXI.Point(2, 2)
    this.sprite.x = x
    this.sprite.y = y
    this.width = 96 * 2
    this.height = 96 * 2

    this.state = {
      direction: DIRECTION.DOWN,
      behavior: BEHAVIOR.STAND
    }

    this.animFrame = 0
  }
  get position() {
    return this.sprite.position
  }
  set centerX(value) {
    this.sprite.x = value - this.width / 2
  }
  set centerY(value) {
    this.sprite.y = value - this.height / 2
  }
  playOnce(state) {
    this.animFrame = Timer.time
    this.state = state
  }
  update() {
    this.updateTexture()
  }
  updateTexture() {
    if (this.animFrame === 0) return
    if (Timer.time - this.animFrame < PARAMS.RUN_ANIMATION_FRAME * PARAMS.FRAME_PER_ANIMATION) {
      this.anime =
        Math.floor((Timer.time - this.animFrame) / PARAMS.FRAME_PER_ANIMATION) %
        PARAMS.RUN_ANIMATION_FRAME
      this.sprite.texture = Assets.textures.effect.RUN[this.state.direction][this.anime]
    } else {
      this.animFrame = 0
    }
  }
}
