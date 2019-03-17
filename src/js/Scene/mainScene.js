import BaseScene from './baseScene'
import stage1 from '../Stage/stage1'
import Input from '../input'
import { KEY } from '../Config/keyConfig'
import { LAYERS } from '../Params/params'
import TitleScene from './titleScene'
import Drawer from '../drawer'
import EntityManager from '../entityManager'
import MapChip from '../Entities/mapChip'
import Player from '../Entities/player'
import Chestnut from '../Entities/chestnut'
import * as e from '../Util/ease'
import * as filters from 'pixi-filters'

export default class MainScene extends BaseScene {
  constructor() {
    super()

    this.camera = new PIXI.Container()
    this.camera.pivot.set(Drawer.width / 2, Drawer.height / 2)
    this.camera.position.set(Drawer.width / 2, Drawer.height / 2)

    const fieldLayer = new PIXI.Container()
    const itemLayer = new PIXI.Container()
    const playerLayer = new PIXI.Container()

    playerLayer.filters = [new filters.GlowFilter()]

    this.camera.addChild(fieldLayer)
    this.camera.addChild(itemLayer)
    this.camera.addChild(playerLayer)

    this.stage.addChild(this.camera)

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

    this.stageWidth = Drawer.width * 2
    this.stageHeight = Drawer.height * 2

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
      x: 0,
      y: 0,
      camera: this.camera,
      scene: this
    })
    this.entityManager.addEntity({
      entity: this.cameraTarget,
      layerKey: LAYERS.PLAYER
    })

    for (let i = 0; i < 100; i++) {
      this.entityManager.addEntity({
        entity: new Chestnut({
          x: Math.ceil(Math.random() * Drawer.width),
          y: Math.ceil(Math.random() * Drawer.height),
          scene: this
        }),
        layerKey: LAYERS.ITEM
      })
    }

    console.log('MainScene created')
    this.frame = 0
  }
  update(delta) {
    this.frame++

    this.entityManager.updateAll()
    this.moveCamera()
    this.entityManager.collisionCheck({ layerKey1: LAYERS.PLAYER, layerKey2: LAYERS.ITEM })

    if (Input.isKeyPressed(KEY.ESCAPE)) {
      this.entityManager.destroyAll()
      this.stage.removeChild(this.camera)
      this.camera.destroy()
      this.pop()
      this.push(new TitleScene())
    }
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
}
