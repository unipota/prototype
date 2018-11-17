
export default class InputManager {
  static init () {
    document.addEventListener('keydown', e => {InputManager.onKeyDown(e)})
    document.addEventListener('keyup', e => {InputManager.onKeyUp(e)})
    window.addEventListener('blur', e => {InputManager.reset(e)})
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