import Drawer from '../drawer'
import Assets from '../assets'

export default class HitPoint {
  constructor({ maxHP }) {
    this.maxHP = maxHP
    this.currentHP = maxHP
    this.container = new PIXI.Container()
    this.hps = []
    for (let i = 0; i < maxHP; i++) {
      this.hps.push(Drawer.makeSprite(Assets.textures.ui.heart[0]))
      this.hps[i].scale = new PIXI.Point(2, 2)
      this.hps[i].x = i * 64
      this.container.addChild(this.hps[i])
    }
  }
  setHitPoint(value) {
    for (let i = 0; i < this.maxHP; i++) {
      this.hps[i].texture = Assets.textures.ui.heart[value - 1 < i ? 1 : 0]
    }
  }
}
