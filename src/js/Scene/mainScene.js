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

export default class MainScene extends BaseScene {
  constructor() {
    super()

    this.camera = new PIXI.Container()
    this.camera.pivot.set(Drawer.width / 2, Drawer.height / 2)
    this.camera.position.set(Drawer.width / 2, Drawer.height / 2)

    const fieldLayer = new PIXI.Container()
    const itemLayer = new PIXI.Container()
    const playerLayer = new PIXI.Container()

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

    for (let x = 0; x < (Drawer.width * 2) / 64; x++) {
      for (let y = 0; y < (Drawer.height * 2) / 64; y++) {
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

    this.entityManager.addEntity({
      entity: new Player({
        x: 0,
        y: 0,
        camera: this.camera,
        scene: this
      }),
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
  }
  update() {
    this.entityManager.updateAll()
    this.entityManager.collisionCheck({ layerKey1: LAYERS.PLAYER, layerKey2: LAYERS.ITEM })

    if (Input.isKeyPressed(KEY.ESCAPE)) {
      this.entityManager.destroyAll()
      this.stage.removeChild(this.camera)
      this.camera.destroy()
      this.pop()
      this.push(new TitleScene())
    }
  }
}
