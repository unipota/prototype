import BaseScene from './baseScene'
import TitleScene from './titleScene'
import Input from '../input'
import Drawer from '../drawer'
import Text from '../text'
import Assets from '../assets'
import { KEY } from '../Config/keyConfig'

export default class ResultScene extends BaseScene {
  constructor({ score }) {
    super()
    let text = Text.makeText({ text: 'RESULT', style: 'normal' })
    let resultScore = Text.makeText({ text: `${score}`, style: 'normal' })
    resultScore.y = 100

    this.stage.addChild(resultScore)
    this.stage.addChild(text)
  }
  update() {
    if (Input.isKeyPressed(KEY.ENTER)) {
      console.log('key pressed')
      this.pop()
      this.push(new TitleScene())
    }
  }
}
