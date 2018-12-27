import BaseScene from './baseScene'
import MainScene from './mainScene'
import Input from '../input'
import Drawer from '../drawer'

export default class TitleScene extends BaseScene {
  constructor () {
    super()
    let text = new PIXI.Text('press any key',{fontFamily : 'M+ 1c', fontSize: 24, fill : 0x101010, align : 'center'})
    this.stage.addChild(text)
  }
  update () {
    if (Input.isAnyKeyPressed()) {
      console.log('key pressed')
      this.pop()
      this.push(new MainScene())
    }
  }
}