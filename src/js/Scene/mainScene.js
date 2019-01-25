import BaseScene from './baseScene'
import Player from '../Entities/player'
import Input from '../input'
import keyConfig from '../Config/keyConfig'
import TitleScene from './titleScene'
import Drawer from '../drawer'

export default class MainScene extends BaseScene {
  constructor() {
    super()
    this.entities = []
    this.entities.push(new Player(this))
    this.stage.scale.x = this.stage.scale.y = 2
    console.log('MainScene created')
  }
  update() {
    this.updateAllEntities()
    if (Input.isKeyPressed(keyConfig.escape)) {
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
