import BaseEntity from './baseEntity'
import Drawer from '../drawer'
import Input from '../input'
import { KEY } from '../Config/keyConfig'
import Assets from '../assets'
import { BloomFilter } from '@pixi/filter-bloom'
import { Collider, RectCollider } from '../collider'
import { COLLISIONS } from '../Params/params'

const PARAMS = {
  RUN_SPEED: 0.3,
  RUN_SPEED_LIMIT: 3,
  RUN_RESIST: 0.03,
  RUN_ANIMATION_FRAME: 6,
  ANIMATION_PER_FRAME: 10
}

const BEHAVIOR = {
  STAND: 'STAND',
  RUN: 'RUN'
}

const DIRECTION = {
  UP: 'UP',
  UP_RIGHT: 'UP_RIGHT',
  UP_LEFT: 'UP_LEFT',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  DOWN: 'DOWN',
  DOWN_RIGHT: 'DOWN_RIGHT',
  DOWN_LEFT: 'DOWN_LEFT'
}

export default class Player extends BaseEntity {
  constructor({ camera, x, y, scene }) {
    super()
    this.state = {
      direction: DIRECTION.DOWN,
      behavior: BEHAVIOR.STAND
    }
    this.sprite = Drawer.makeSprite(Assets.textures.mychara.STAND.DOWN[0])
    this.sprite.scale = new PIXI.Point(2, 2)
    this.sprite.x = x
    this.sprite.y = y
    this.width = 64
    this.height = 64

    this.camera = camera
    this.scene = scene

    this.vel = {
      x: 0,
      y: 0
    }
    this.anime = 0
    this.hitCount = 0

    this.collider = new Collider()

    const itemCollider = new RectCollider({ width: this.width, height: this.height })
    itemCollider.padding = { top: 32, left: 24, right: 24, bottom: 0 }
    this.collider.addCollider({
      collider: itemCollider,
      key: COLLISIONS.ITEM
    })

    const bulletCollider = new RectCollider({ width: this.width, height: this.height })
    bulletCollider.padding = { top: 0, left: 0, right: 0, bottom: 0 }
    this.collider.addCollider({
      collider: bulletCollider,
      key: COLLISIONS.BULLET
    })
  }
  getCollider({ key }) {
    return this.collider.getCollider({ key, x: this.position.x, y: this.position.y })
  }
  get position() {
    return this.sprite.position
  }
  set index(val) {
    this._index = val
  }
  addToLayer(stage) {
    stage.addChild(this.sprite)
  }
  update() {
    this.frame++
    this.resistVelocity()
    this.limitVelocity()
    this.applyVelocity()
    this.updateState()
    this.updateTexture()
  }
  updateState() {
    const nextState = { behavior: this.state.behavior, direction: this.state.direction }
    this.updateDirection(nextState)
    this.updateBehavior(nextState)
    this.state = nextState
  }
  updateDirection(nextState) {
    if (Input.isKeyPressed(KEY.UP)) {
      nextState.direction = DIRECTION.UP
      if (Input.isKeyPressed(KEY.RIGHT)) nextState.direction = DIRECTION.UP_RIGHT
      if (Input.isKeyPressed(KEY.LEFT)) nextState.direction = DIRECTION.UP_LEFT
      return
    }
    if (Input.isKeyPressed(KEY.DOWN)) {
      nextState.direction = DIRECTION.DOWN
      if (Input.isKeyPressed(KEY.RIGHT)) nextState.direction = DIRECTION.DOWN_RIGHT
      if (Input.isKeyPressed(KEY.LEFT)) nextState.direction = DIRECTION.DOWN_LEFT
      return
    }
    if (Input.isKeyPressed(KEY.RIGHT)) nextState.direction = DIRECTION.RIGHT
    if (Input.isKeyPressed(KEY.LEFT)) nextState.direction = DIRECTION.LEFT
  }
  updateBehavior(nextState) {
    switch (this.state.behavior) {
      case BEHAVIOR.STAND:
        if (Input.isAnyKeyPressed(KEY.UP, KEY.RIGHT, KEY.DOWN, KEY.LEFT)) {
          nextState.behavior = BEHAVIOR.RUN
        }
        this.handleStandBehavior(nextState)
        break
      case BEHAVIOR.RUN:
        if (!Input.isAnyKeyPressed(KEY.UP, KEY.RIGHT, KEY.DOWN, KEY.LEFT)) {
          nextState.behavior = BEHAVIOR.STAND
          break
        }
        if (this.state.direction === nextState.direction) {
          this.anime =
            Math.ceil(this.frame / PARAMS.ANIMATION_PER_FRAME) % PARAMS.RUN_ANIMATION_FRAME
          this.handleRunBehavior(nextState)
        }
    }
  }
  handleStandBehavior(nextState) {
    this.vel.x = 0
    this.vel.y = 0
  }
  handleRunBehavior(nextState) {
    switch (nextState.direction) {
      case DIRECTION.UP:
        this.vel.y -= PARAMS.RUN_SPEED
        break
      case DIRECTION.UP_RIGHT:
        this.vel.x += PARAMS.RUN_SPEED / Math.sqrt(2)
        this.vel.y -= PARAMS.RUN_SPEED / Math.sqrt(2)
        break
      case DIRECTION.UP_LEFT:
        this.vel.x -= PARAMS.RUN_SPEED / Math.sqrt(2)
        this.vel.y -= PARAMS.RUN_SPEED / Math.sqrt(2)
        break
      case DIRECTION.RIGHT:
        this.vel.x += PARAMS.RUN_SPEED
        break
      case DIRECTION.LEFT:
        this.vel.x -= PARAMS.RUN_SPEED
        break
      case DIRECTION.DOWN:
        this.vel.y += PARAMS.RUN_SPEED
        break
      case DIRECTION.DOWN_RIGHT:
        this.vel.x += PARAMS.RUN_SPEED / Math.sqrt(2)
        this.vel.y += PARAMS.RUN_SPEED / Math.sqrt(2)
        break
      case DIRECTION.DOWN_LEFT:
        this.vel.x -= PARAMS.RUN_SPEED / Math.sqrt(2)
        this.vel.y += PARAMS.RUN_SPEED / Math.sqrt(2)
        break
    }
  }
  updateTexture() {
    switch (this.state.behavior) {
      case BEHAVIOR.STAND:
        switch (this.state.direction) {
          case DIRECTION.UP:
          case DIRECTION.UP_RIGHT:
            this.sprite.texture = Assets.textures.mychara.STAND.UP[0]
            break
          case DIRECTION.RIGHT:
          case DIRECTION.DOWN_RIGHT:
            this.sprite.texture = Assets.textures.mychara.STAND.RIGHT[0]
            break
          case DIRECTION.DOWN:
          case DIRECTION.DOWN_LEFT:
            this.sprite.texture = Assets.textures.mychara.STAND.DOWN[0]
            break
          case DIRECTION.LEFT:
          case DIRECTION.UP_LEFT:
            this.sprite.texture = Assets.textures.mychara.STAND.LEFT[0]
            break
        }
        break
      case BEHAVIOR.RUN:
        this.sprite.texture =
          Assets.textures.mychara[this.state.behavior][this.state.direction][this.anime]
        break
    }
  }
  moveCamera() {
    const targetX = this.sprite.x + this.sprite.width / 2
    const targetY = this.sprite.y + this.sprite.height / 2

    this.camera.pivot.x = (targetX - this.camera.pivot.x) * 0.04 + this.camera.pivot.x
    this.camera.pivot.y = (targetY - this.camera.pivot.y) * 0.04 + this.camera.pivot.y

    if (Input.isKeyPressed(KEY.SHIFT)) {
      this.shakeF = 80
    }
    if (this.shakeF > 0) {
      const t = 80 - this.shakeF
      this.camera.pivot.x += (3 ^ (-t / 100)) * Math.cos(t / 50) * Math.cos(t / 1) * 2
      this.camera.pivot.y += (3 ^ (-t / 100)) * Math.cos(t / 50) * Math.cos(t / 1) * 2
      this.shakeF--
    }
  }
  limitVelocity() {
    this.vel.x =
      this.vel.x > 0
        ? Math.min(this.vel.x, PARAMS.RUN_SPEED_LIMIT)
        : Math.max(this.vel.x, -1 * PARAMS.RUN_SPEED_LIMIT)
    this.vel.y =
      this.vel.y > 0
        ? Math.min(this.vel.y, PARAMS.RUN_SPEED_LIMIT)
        : Math.max(this.vel.y, -1 * PARAMS.RUN_SPEED_LIMIT)
  }
  resistVelocity() {
    this.vel.x =
      Math.abs(this.vel.x) < PARAMS.RUN_RESIST + 0.001
        ? 0
        : this.vel.x > 0
        ? this.vel.x - PARAMS.RUN_RESIST
        : this.vel.x < 0
        ? this.vel.x + PARAMS.RUN_RESIST
        : this.vel.x
    this.vel.y =
      Math.abs(this.vel.y) < PARAMS.RUN_RESIST + 0.001
        ? 0
        : this.vel.y > 0
        ? this.vel.y - PARAMS.RUN_RESIST
        : this.vel.y < 0
        ? this.vel.y + PARAMS.RUN_RESIST
        : this.vel.y
  }
  applyVelocity() {
    this.sprite.x += this.vel.x
    this.sprite.y += this.vel.y
  }
  hit(target) {
    this.hitCount++
    console.log(this.hitCount)
  }
  destroy() {
    this.sprite.destroy()
  }
}
