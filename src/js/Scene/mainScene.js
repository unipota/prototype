import BaseScene from './BaseScene'
import stage1 from 'js/Stage/Stage1'
import Player from 'js/Entities/Player'
import MapChip from 'js/Entities/MapChip'
import Input from 'js/Input'
import keyConfig from 'js/Config/KeyConfig'
import TitleScene from './TitleScene'
import Drawer from 'js/Drawer'

export default class MainScene extends BaseScene {
  constructor() {
    super()
    this.entities = []
    for (let x = 0; x < Drawer.width / 32 / 2; x++) {
      for (let y = 0; y < Drawer.height / 32 / 2; y++) {
        this.entities.push(
          new MapChip({
            scene: this,
            id: 0,
            x: x * 32,
            y: y * 32
          })
        )
      }
    }
    this.entities.push(
      new Player({
        scene: this,
        x: 100,
        y: 100
      })
    )

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
}
