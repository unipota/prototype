import BaseScene from './baseScene'
import MainScene from './mainScene'
import Input from '../input'
import Drawer from '../drawer'
import Assets from '../assets'
import Text from '../text'
import Timer from '../timer'

export default class TitleScene extends BaseScene {
  constructor() {
    super()

    this.textPressAnyKey = Text.makeText({ text: 'press any key', style: 'normal' })

    const titleBackground = Drawer.makeSprite(Assets.textures.ui.title, PIXI.SCALE_MODES.LINEAR)
    titleBackground.width = Drawer.width
    titleBackground.height = Drawer.height
    titleBackground.roundPixels = true

    this.stage.addChild(titleBackground)
    this.stage.addChild(this.textPressAnyKey)
  }
  update() {
    if (Input.isAnyKeyTriggered()) {
      console.log('key pressed')
      this.pop()
      this.push(new MainScene())
    }
  }
}
