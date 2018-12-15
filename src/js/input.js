
export default class Input {
  static init () {
    document.addEventListener('keydown', e => {Input.onKeyDown(e)})
    document.addEventListener('keyup', e => {Input.onKeyUp(e)})
    window.addEventListener('blur', e => {Input.reset(e)})
    this.pressedKey = {}
    this.pressedKeyLock = {}
    console.log('InputManager init')
  }
  static onKeyDown (event) {
    // console.log(event.keyCode)
    this.pressedKey[event.keyCode] = true
  }
  static onKeyUp (event) {
    // console.log(event.keyCode)
    this.pressedKey[event.keyCode] = false
    this.pressedKeyLock[event.keyCode] = false
  }
  static reset (event) {
    this.pressedKey = {}
    this.pressedKeyLock = {}
  }
  static isKeyPressed (keyCode) {
    if (this.pressedKey[keyCode]) {
      this.pressedKeyLock[keyCode] = true
      return true
    }
    return false
  }
  static isKeyTriggered (keyCode) {
    if (this.pressedKey[keyCode] && !this.pressedKeyLock[keyCode]) {
      this.pressedKeyLock[keyCode] = true
      return true
    }
    return false
  }
  static isAnyKeyPressed () {
  }
}