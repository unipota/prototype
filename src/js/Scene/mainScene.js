import BaseScene from './baseScene'
import stage1 from '../Stage/stage1'
import Input from '../input'
import { KEY } from '../Config/keyConfig'
import { LAYERS, COLLISIONS, CHESTNUTS } from '../Params/params'
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
import HitPoint from '../Ui/hitPoint'
import * as e from '../Util/ease'
import * as filters from 'pixi-filters'
import ExitArea from '../Entities/exitArea'

export default class MainScene extends BaseScene {
  constructor() {
    super()

    this.camera = new PIXI.Container()
    this.camera.pivot.set(Drawer.width / 2, Drawer.height / 2)
    this.camera.position.set(Drawer.width / 2, Drawer.height / 2)

    this.stageWidth = Drawer.width * 2
    this.stageHeight = Drawer.height * 2

    const fieldLayer = new PIXI.Container()
    const filedEntityLayer = new PIXI.Container()
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
    this.camera.addChild(filedEntityLayer)
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
      container: filedEntityLayer,
      key: LAYERS.FIELD_ENTITY
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

    this.entityManager.addEntity({
      entity: new ExitArea({
        x: this.stageWidth / 2 - 96 / 2,
        y: this.stageHeight - 32
      }),
      layerKey: LAYERS.FIELD_ENTITY
    })

    for (let x = 0; x < this.stageWidth / 64; x++) {
      for (let y = 0; y < this.stageHeight / 64; y++) {
        this.entityManager.addEntity({
          entity: new MapChip({
            id: Math.random() > 0.9 ? 1 : 0,
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
        x: this.stageWidth / 4,
        y: 200,
        scene: this
      }),
      layerKey: LAYERS.ENEMY
    })
    this.entityManager.addEntity({
      entity: new Enemy0({
        x: (this.stageWidth / 4) * 3,
        y: 200,
        scene: this
      }),
      layerKey: LAYERS.ENEMY
    })

    const chestRateSum = CHESTNUTS.map(a => a.rate).reduce((a, b) => a + b)
    const rates = CHESTNUTS.map((a, i) => {
      return { index: i, rate: a.rate / chestRateSum }
    }).sort((a, b) => b.rate - a.rate)

    for (let i = 0; i < 500; i++) {
      let rndm = Math.random()
      let id = 0
      let acc = 0
      for (let i = 0; i < CHESTNUTS.length; i++) {
        acc += rates[i].rate
        if (rndm < acc) {
          id = rates[i].index
          break
        }
      }
      this.entityManager.addEntity({
        entity: new Chestnut({
          x: Math.ceil(Math.random() * this.stageWidth),
          y: Math.ceil((Math.random() * this.stageHeight) / 2),
          scene: this,
          id: id
        }),
        layerKey: LAYERS.ITEM
      })
    }

    this.uiLayer = new PIXI.Container()

    this.priceText = Text.makeText({ text: '', style: 'gradient' })
    this.priceText.x = Drawer.width / 2
    this.priceText.y = 0
    this.uiLayer.addChild(this.priceText)

    this.totalPriceText = Text.makeText({ text: '', style: 'gradient' })
    this.totalPriceText.y = Drawer.height - 64
    this.uiLayer.addChild(this.totalPriceText)

    this.hitPoint = new HitPoint({ maxHP: 3 })
    this.uiLayer.addChild(this.hitPoint.container)

    // show all layers
    this.stage.addChild(this.camera)
    this.stage.addChild(this.uiLayer)
    console.log('MainScene created')

    this.slowFlag = false
    this.slowFrameCount = 0

    this.gameoverFrame = 0

    Sound.setVolume('field', 0.5)
    Sound.setLoop('field')
    Sound.play('field')
  }
  update(delta) {
    this.entityManager.updateAll()
    this.moveCamera()
    this.collisionDetect()
    this.updateFilters()
    this.updateUi()

    if (this.gameoverFrame !== 0 && Timer.time - this.gameoverFrame >= 50) {
      this.entityManager.destroyAll()
      this.stage.removeChild(this.camera)
      this.camera.destroy()
      this.pop()
      this.push(new ResultScene({ score: this.totalPrice }))
    }

    if (Input.isKeyPressed(KEY.ESCAPE)) {
      this.entityManager.destroyAll()
      this.stage.removeChild(this.camera)
      this.camera.destroy()
      this.pop()
      this.push(new TitleScene())
    }
  }
  updateUi() {
    this.totalPriceText.text = `${this.cameraTarget.totalPrice}G`
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
    this.entityManager.collisionDetect({
      layerKey1: LAYERS.PLAYER,
      layerKey2: LAYERS.FIELD_ENTITY,
      colliderKey: COLLISIONS.EXIT
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
  getItem({ price, id }) {
    // console.log(id)
    this.priceText.text = `${CHESTNUTS[id].name} GET!`
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
      Sound.setReverbFilter('field')
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
    Sound.clearFilters('field')
    Sound.stop('shockwave')
    this.slowFlag = false
    this.slowFrameCount = 0
    this.cameraTarget.itemAbsorpFlag = false
    Timer.resetScale()
  }
  clearFilters() {
    this.camera.filters = null
  }
  setHitPoint(value) {
    this.hitPoint.setHitPoint(value)
  }
  setGameover() {
    if (this.gameoverFrame !== 0) return
    Timer.setScaleTimeout({ scale: 0.1, frame: 50 })
    this.gameoverFrame = Timer.time
    this.totalPrice = 0
  }
  setGameclear() {
    if (this.gameoverFrame !== 0) return
    Timer.setScaleTimeout({ scale: 0.1, frame: 50 })
    this.gameoverFrame = Timer.time
    this.totalPrice = this.cameraTarget.totalPrice
  }
}
