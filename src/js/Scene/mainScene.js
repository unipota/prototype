import BaseScene from './baseScene'
import stage1 from '../Stage/stage1'
import Input from '../input'
import { KEY } from '../Config/keyConfig'
import TitleScene from './titleScene'
import Drawer from '../drawer'
import EntityManager from '../entityManager'
import MapChip from '../Entities/mapChip'
import Player from '../Entities/player'
import Chestnut from '../Entities/chestnut'

const LAYERS = {
  FIELD: 'field',
  ITEM: 'item',
  PLAYER: 'player'
}

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
    this.camera.addChild(playerLayer)
    this.camera.addChild(itemLayer)

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
        camera: this.camera
      }),
      layerKey: LAYERS.PLAYER
    })

    this.entityManager.addEntity({
      entity: new Chestnut({
        x: 200,
        y: 200
      }),
      layerKey: LAYERS.ITEM
    })

    console.log('MainScene created')
  }
  update() {
    this.entityManager.updateAll()
    this.entityManager.collisionCheck({ layerKey1: LAYERS.PLAYER, layerKey2: LAYERS.ITEM })

    if (Input.isKeyPressed(KEY.ESCAPE)) {
      this.entityManager.destroyAll()
      this.camera.removeChildren()
      this.stage.removeChild(this.camera)
      this.pop()
      this.push(new TitleScene())
    }
  }
}
