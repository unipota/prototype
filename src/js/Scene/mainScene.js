import BaseScene from './baseScene'
import stage1 from 'js/Stage/stage1'
import Player from 'js/Entities/player'
import MapChip from 'js/Entities/mapChip'
import Input from 'js/input'
import keyConfig from 'js/Config/keyConfig'
import TitleScene from './titleScene'
import Drawer from 'js/drawer'

export default class MainScene extends BaseScene {
  constructor() {
    super()

    this.camera = new PIXI.Container()
    this.camera.position.set(Drawer.width / 4, Drawer.height / 4)

    this.entities = []
    for (let x = 0; x < Drawer.width / 32; x++) {
      for (let y = 0; y < Drawer.height / 32; y++) {
        this.entities.push(
          new MapChip({
            camera: this.camera,
            id: 0,
            x: x * 32,
            y: y * 32
          })
        )
      }
    }
    this.entities.push(
      new Player({
        camera: this.camera,
        x: 120,
        y: 120
      })
    )

    this.stage.addChild(this.camera)

    this.stage.scale.x = this.stage.scale.y = 2
    console.log('MainScene created')
  }
  update() {
    this.updateAllEntities()
    if (Input.isKeyPressed(keyConfig.ESCAPE)) {
      this.pop()
      this.push(new TitleScene())
    }
  }
  updateAllEntities() {
    this.entities.forEach(e => {
      e.update()
    })
  }
  destroyAllEntities() {
    this.entities.forEach(e => {
      e.destroy()
    })
  }
}
