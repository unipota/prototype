export default class Input {
  static init() {
    document.addEventListener('keydown', e => {
      Input.onKeyDown(e)
    })
    document.addEventListener('keypress', e => {
      Input.onKeyPress(e)
    })
    document.addEventListener('keyup', e => {
      Input.onKeyUp(e)
    })
    window.addEventListener('blur', _ => {
      Input.reset()
    })
    this.pressedKey = {}
    this.pressedKeyLock = {}
    console.log('InputManager init')
  }
  static onKeyDown(event) {
    // console.log(event.keyCode)
    this.pressedKey[event.keyCode] = true
  }
  static onKeyPress(event) {}
  static onKeyUp(event) {
    this.pressedKey[event.keyCode] = false
    this.pressedKeyLock[event.keyCode] = false
  }
  static reset() {
    this.pressedKey = {}
    this.pressedKeyLock = {}
  }
  static isKeyPressed(keyCode) {
    if (this.pressedKey[keyCode]) {
      this.pressedKeyLock[keyCode] = true
      return true
    }
    return false
  }
  static isKeyTriggered(keyCode) {
    if (this.pressedKey[keyCode] && !this.pressedKeyLock[keyCode]) {
      this.pressedKeyLock[keyCode] = true
      return true
    }
    return false
  }
  static isAnyKeyPressed(...keyCodes) {
    if (keyCodes.length > 0) {
      let result = false
      keyCodes.forEach(k => {
        if (this.isKeyPressed(k)) result = true
      })
      return result
    } else {
      for (let k in this.pressedKey) {
        if (this.pressedKey[k]) return true
      }
      return false
    }
  }
  static isAnyKeyTriggered() {
    for (let k in this.pressedKey) {
      if (this.pressedKey[k] && !this.pressedKeyLock[k]) {
        this.pressedKeyLock[k] = true
        return true
      }
    }
    return false
  }
}
