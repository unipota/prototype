import BaseEntity from './baseEntity'
import Drawer from '../drawer'
import Sound from '../sound'
import Input from '../input'
import { KEY } from '../Config/keyConfig'
import Assets from '../assets'
import { Collider, RectCollider } from '../collider'
import { COLLISIONS } from '../Params/params'
import Timer from '../timer'
import * as filters from 'pixi-filters'

export const PARAMS = {
  RUN_SPEED: 0.3,
  RUN_SPEED_LIMIT: 3,
  RUN_RESIST: 0.03,
  RUN_ANIMATION_FRAME: 6,
  FRAME_PER_ANIMATION: 5
}

export const BEHAVIOR = {
  STAND: 'STAND',
  RUN: 'RUN'
}

export const DIRECTION = {
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
    this.sprite.anchor.set(0, 0)
    this.width = 64
    this.height = 64

    this.camera = camera
    this.scene = scene

    this.hitPoint = 10

    this.colorMatrixFilter = new PIXI.filters.ColorMatrixFilter()
    this.colorMatrixFilter.hue(0)

    this.sprite.filters = [this.colorMatrixFilter]

    this.invincibleFrame = 0

    this.vel = {
      x: 0,
      y: 0
    }
    this.anime = 0
    this.totalPrice = 0

    this.collider = new Collider()

    this.itemCollider = new RectCollider({ width: this.width, height: this.height })
    this.itemCollider.padding = { top: 32, left: 16, right: 16, bottom: 0 }
    this.collider.addCollider({
      collider: this.itemCollider,
      key: COLLISIONS.ITEM
    })

    this.bulletCollider = new RectCollider({ width: this.width, height: this.height })
    this.bulletCollider.padding = { top: 28, left: 28, right: 28, bottom: 28 }
    this.collider.addCollider({
      collider: this.bulletCollider,
      key: COLLISIONS.BULLET
    })

    this.bulletGrazeCollider = new RectCollider({ width: this.width, height: this.height })
    this.bulletGrazeCollider.padding = { top: 18, left: 18, right: 18, bottom: 18 }
    this.collider.addCollider({
      collider: this.bulletGrazeCollider,
      key: COLLISIONS.BULLET_GRAZE
    })

    this.itemAbsorpCollider = new RectCollider({ width: this.width, height: this.height })
    this.itemCollider.padding = { top: 32, left: 16, right: 16, bottom: 0 }
    this.collider.addCollider({
      collider: this.itemAbsorpCollider,
      key: COLLISIONS.ITEM_ABSORP
    })

    this.itemAbsorpFlag = false
    this.lastGrazeTime = 0
  }
  getCollider({ key }) {
    return this.collider.getCollider({ key, x: this.position.x, y: this.position.y })
  }
  get position() {
    return this.sprite.position
  }
  get centerPosition() {
    return new PIXI.Point(
      this.sprite.position.x + this.width / 2,
      this.sprite.position.y + this.height / 2
    )
  }
  set index(val) {
    this._index = val
  }
  addToLayer(stage) {
    stage.addChild(this.sprite)
  }
  update() {
    this.resistVelocity()
    this.limitVelocity()
    this.applyVelocity()
    this.limitPosition()
    this.updateState()
    this.updateTexture()
    this.updateCollider()
  }
  updateState() {
    const nextState = { behavior: this.state.behavior, direction: this.state.direction }
    this.updateDirection(nextState)
    this.updateBehavior(nextState)
    this.updateRunEffect(nextState)
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
            Math.ceil(Timer.scaledTime / PARAMS.FRAME_PER_ANIMATION) % PARAMS.RUN_ANIMATION_FRAME
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
  updateRunEffect(nextState) {
    this.runEffect.centerX = this.centerPosition.x
    this.runEffect.centerY = this.centerPosition.y

    if (
      this.state.direction !== nextState.direction ||
      this.state.behavior !== nextState.behavior
    ) {
      this.runEffect.playOnce(this.state)
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
    this.sprite.x += this.vel.x * Timer.scale
    this.sprite.y += this.vel.y * Timer.scale
  }
  limitPosition() {
    this.sprite.x =
      this.sprite.x + this.width > this.scene.stageWidth
        ? this.scene.stageWidth - this.width
        : this.sprite.x
    this.sprite.x = this.sprite.x < 0 ? 0 : this.sprite.x
    this.sprite.y =
      this.sprite.y + this.height > this.scene.stageHeight
        ? this.scene.stageHeight - this.height
        : this.sprite.y
    this.sprite.y = this.sprite.y < 0 ? 0 : this.sprite.y
  }
  updateCollider() {
    if (this.itemAbsorpFlag) {
      this.itemAbsorpCollider.padding = { top: -64, left: -64, right: -64, bottom: -64 }
    } else {
      this.itemAbsorpCollider.padding = { top: 32, left: 16, right: 16, bottom: 0 }
    }
  }
  hit({ target, colliderKey }) {
    switch (colliderKey) {
      case COLLISIONS.ITEM:
        this.totalPrice += target.price
        this.scene.getItem({ price: target.price })
        Sound.play('po')
        break
      case COLLISIONS.ITEM_ABSORP:
        break
      case COLLISIONS.BULLET:
        if (this.invincibleFrame !== 0) {
          this.hitPoint--
          this.invincibleFrame = Timer.time
        }
        this.scene.clearSlowmode()
        this.scene.clearFilters()
        break
      case COLLISIONS.BULLET_GRAZE:
        if (this.lastGrazeTime !== 0) {
          if (Timer.time - this.lastGrazeTime <= 2) {
            this.scene.setSlowmode()
            this.itemAbsorpFlag = true
            this.lastGrazeTime = 0
          } else {
            this.lastGrazeTime = 0
          }
        } else {
          this.lastGrazeTime = Timer.time
        }
        break
    }
  }
  destroy() {
    this.sprite.destroy()
  }
}
