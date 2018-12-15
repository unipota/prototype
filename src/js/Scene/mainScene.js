import BaseScene from './baseScene'
import Player from '../Entities/player'

export default class MainScene extends BaseScene {
  constructor () {
    super()
    this.entities = []
    this.entities.push(new Player())
    console.log('MainScene created')
  }
  update () {
    this.updateAllEntities()
  }
  updateAllEntities () {
    this.entities.forEach(
      e => { e.update() }
    )
  }
}