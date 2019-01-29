import BaseScene from './BaseScene'
import MainScene from './MainScene'
import Input from '../Input'
import Drawer from '../Drawer'

export default class TitleScene extends BaseScene {
  constructor() {
    super()
    let text = new PIXI.Text('press any key', {
      fontFamily: 'M+ 1c',
      fontSize: 24,
      fill: 0x101010,
      align: 'center'
    })
    this.stage.addChild(text)
  }
  update() {
    if (Input.isAnyKeyPressed()) {
      console.log('key pressed')
      this.pop()
      this.push(new MainScene())
    }
  }
}
