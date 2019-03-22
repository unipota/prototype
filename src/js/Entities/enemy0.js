import BaseEntity from './baseEntity'
import Drawer from '../drawer'
import Assets from '../assets'
import Bullet from './bullet'
import Timer from '../timer'
import { LAYERS } from '../Params/params'
import * as filters from 'pixi-filters'

export default class Enemy0 extends BaseEntity {
  constructor({ x, y, scene }) {
    super()
    this.sprite = Drawer.makeSprite(Assets.textures.enemy[0])
    this.sprite.x = x
    this.sprite.y = y
    this.sprite.filters = [new filters.GlowFilter()]
    this.sprite.scale = new PIXI.Point(2, 2)

    this.scene = scene

    this.frame = 0
  }
  get position() {
    return this.sprite.position
  }
  set index(val) {
    this._index = val
  }
  update() {
    if (Timer.scaledTime % 100 === 0) {
      for (let i = 0; i < 8; i++) {
        this.scene.entityManager.addEntity({
          entity: new Bullet({
            x: this.position.x,
            y: this.position.y,
            vec: new PIXI.Point(
              1 * Math.cos((i * 45 * Math.PI) / 180),
              1 * Math.sin((i * 45 * Math.PI) / 180)
            ),
            scene: this.scene
          }),
          layerKey: LAYERS.ENEMY_BULLET
        })
      }
    }
  }
  destroy() {
    this.sprite.destroy()
  }
}
