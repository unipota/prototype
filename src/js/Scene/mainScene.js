import BaseScene from './baseScene'
import stage1 from '../Stage/stage1'
import Input from '../input'
import { KEY } from '../Config/keyConfig'
import { LAYERS, COLLISIONS } from '../Params/params'
import TitleScene from './titleScene'
import ResultScene from './resultScene'
import Drawer from '../drawer'
import Timer from '../timer'
import Sound from '../sound'
import Text from '../text'
import EntityManager from '../entityManager'
import MapChip from '../Entities/mapChip'
import Player from '../Entities/player'
import PlayerRunEffect from '../Entities/playerRunEffect'
import Chestnut from '../Entities/chestnut'
import Enemy0 from '../Entities/enemy0'
import * as e from '../Util/ease'
import * as filters from 'pixi-filters'

export default class MainScene extends BaseScene {
  constructor() {
    super()

    this.camera = new PIXI.Container()
    this.camera.pivot.set(Drawer.width / 2, Drawer.height / 2)
    this.camera.position.set(Drawer.width / 2, Drawer.height / 2)

    this.stageWidth = Drawer.width * 2
    this.stageHeight = Drawer.height * 2

    const fieldLayer = new PIXI.Container()
    const itemLayer = new PIXI.Container()
    const playerLayer = new PIXI.Container()
    const playerEffectLayer = new PIXI.Container()
    const enemyLayer = new PIXI.Container()
    const enemyBulletLayer = new PIXI.Container()

    this.shockwaveFilter = new filters.ShockwaveFilter()
    this.zoomBlurFilter = new filters.ZoomBlurFilter()
    this.colorMatrixFilter = new PIXI.filters.ColorMatrixFilter()

    // this.colorMatrixFilter.negative(true)
    this.colorMatrixFilter.greyscale(0.5, true)

    this.camera.addChild(fieldLayer)
    this.camera.addChild(itemLayer)
    this.camera.addChild(playerLayer)
    this.camera.addChild(playerEffectLayer)
    this.camera.addChild(enemyLayer)
    this.camera.addChild(enemyBulletLayer)

    this.entityManager = new EntityManager()
    this.entityManager.addLayer({
      container: fieldLayer,
      key: LAYERS.FIELD
    })
    this.entityManager.addLayer({
      container: itemLayer,
      key: LAYERS.ITEM
    })
    this.entityManager.addLayer({
      container: playerLayer,
      key: LAYERS.PLAYER
    })
    this.entityManager.addLayer({
      container: playerEffectLayer,
      key: LAYERS.PLAYER_EFFECT
    })
    this.entityManager.addLayer({
      container: enemyLayer,
      key: LAYERS.ENEMY
    })
    this.entityManager.addLayer({
      container: enemyBulletLayer,
      key: LAYERS.ENEMY_BULLET
    })

    for (let x = 0; x < this.stageWidth / 64; x++) {
      for (let y = 0; y < this.stageHeight / 64; y++) {
        this.entityManager.addEntity({
          entity: new MapChip({
            id: 0,
            x: x * 64,
            y: y * 64
          }),
          layerKey: LAYERS.FIELD
        })
      }
    }

    this.cameraTarget = new Player({
      x: this.stageWidth / 2,
      y: this.stageHeight - 100,
      camera: this.camera,
      scene: this
    })
    this.entityManager.addEntity({
      entity: this.cameraTarget,
      layerKey: LAYERS.PLAYER
    })

    const playerRunEffect = new PlayerRunEffect({
      x: this.cameraTarget.position.x,
      y: this.cameraTarget.position.y
    })
    this.entityManager.addEntity({
      entity: playerRunEffect,
      layerKey: LAYERS.PLAYER_EFFECT
    })

    this.cameraTarget.runEffect = playerRunEffect

    this.entityManager.addEntity({
      entity: new Enemy0({
        x: this.stageWidth / 2,
        y: 200,
        scene: this
      }),
      layerKey: LAYERS.ENEMY
    })

    for (let i = 0; i < 500; i++) {
      this.entityManager.addEntity({
        entity: new Chestnut({
          x: Math.ceil(Math.random() * this.stageWidth),
          y: Math.ceil((Math.random() * this.stageHeight) / 2),
          scene: this
        }),
        layerKey: LAYERS.ITEM
      })
    }

    this.uiLayer = new PIXI.Container()

    this.priceText = Text.makeText({ text: '', style: 'gradient' })
    this.uiLayer.addChild(this.priceText)

    this.totalPriceText = Text.makeText({ text: '', style: 'gradient' })
    this.totalPriceText.y = Drawer.height - 64
    this.uiLayer.addChild(this.totalPriceText)

    // show all layers
    this.stage.addChild(this.camera)
    this.stage.addChild(this.uiLayer)
    console.log('MainScene created')

    this.slowFlag = false
    this.slowFrameCount = 0

    Sound.setVolume('field', 0.5)
    Sound.setLoop('field')
    Sound.play('field')
  }
  update(delta) {
    this.entityManager.updateAll()
    this.moveCamera()
    this.collisionDetect()
    this.updateFilters()

    if (this.cameraTarget.hitPoint <= 0) {
      this.entityManager.destroyAll()
      this.stage.removeChild(this.camera)
      this.camera.destroy()
      this.pop()
      this.push(new ResultScene({ score: this.cameraTarget.totalPrice }))
    }

    if (Input.isKeyPressed(KEY.ESCAPE)) {
      this.entityManager.destroyAll()
      this.stage.removeChild(this.camera)
      this.camera.destroy()
      this.pop()
      this.push(new TitleScene())
    }
  }
  collisionDetect() {
    this.entityManager.collisionDetect({
      layerKey1: LAYERS.PLAYER,
      layerKey2: LAYERS.ITEM,
      colliderKey: COLLISIONS.ITEM
    })
    this.entityManager.collisionDetect({
      layerKey1: LAYERS.PLAYER,
      layerKey2: LAYERS.ITEM,
      colliderKey: COLLISIONS.ITEM_ABSORP
    })
    this.entityManager.collisionDetect({
      layerKey1: LAYERS.PLAYER,
      layerKey2: LAYERS.ENEMY_BULLET,
      colliderKey: COLLISIONS.BULLET
    })
    this.entityManager.collisionDetect({
      layerKey1: LAYERS.PLAYER,
      layerKey2: LAYERS.ENEMY_BULLET,
      colliderKey: COLLISIONS.BULLET_GRAZE
    })
  }
  moveCamera() {
    const targetX = this.cameraTarget.position.x + this.cameraTarget.width / 2
    const targetY = this.cameraTarget.position.y + this.cameraTarget.height / 2

    this.camera.pivot.x = Math.min(
      Math.max((targetX - this.camera.pivot.x) * 0.04 + this.camera.pivot.x, Drawer.width / 2),
      this.stageWidth - Drawer.width / 2
    )
    this.camera.pivot.y = Math.min(
      Math.max((targetY - this.camera.pivot.y) * 0.04 + this.camera.pivot.y, Drawer.height / 2),
      this.stageHeight - Drawer.height / 2
    )
  }
  getItem({ price }) {
    this.priceText.text = `${price}G GET!`
    this.totalPriceText.text = `${this.cameraTarget.totalPrice}G`
  }
  updateFilters() {
    if (this.slowFlag && this.slowFrameCount >= 100) {
      this.clearFilters()
      this.clearSlowmode()
    }
    if (this.slowFlag) {
      this.slowFrameCount++

      this.shockwaveFilter.time = e.ease(e.Out(e.cubic))(this.slowFrameCount, 0, 1, 100)

      this.zoomBlurFilter.strength = e.ease(e.Out(e.cubic))(this.slowFrameCount, 0, 0.1, 100)
      this.zoomBlurFilter.center = this.camera.toGlobal(this.cameraTarget.centerPosition)
    }
  }
  setSlowmode() {
    if (!this.slowFlag) {
      Sound.play('shockwave')
      Timer.setScaleTimeout({ scale: 0.1, frame: 100 })
      this.slowFlag = true
      this.slowFrameCount = 0
      this.camera.filters = [this.shockwaveFilter, this.zoomBlurFilter, this.colorMatrixFilter]

      this.shockwaveFilter.time = 0
      this.shockwaveFilter.center = this.camera.toGlobal(this.cameraTarget.centerPosition)

      this.zoomBlurFilter.center = this.camera.toGlobal(this.cameraTarget.centerPosition)
    }
  }
  clearSlowmode() {
    Sound.stop('shockwave')
    this.slowFlag = false
    this.slowFrameCount = 0
    this.cameraTarget.itemAbsorpFlag = false
    Timer.resetScale()
  }
  clearFilters() {
    this.camera.filters = null
  }
}
