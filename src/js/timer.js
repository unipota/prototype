export default class Timer {
  static init() {
    this._frame = 0
    this._scaledFrame = 0
    this._scale = 1
    this._timeout = 0
  }
  static get time() {
    return this._frame
  }
  static get scaledTime() {
    return Math.floor(this._scaledFrame)
  }
  static incTime() {
    this._frame += 1
    this._scaledFrame += 1 * this._scale
    if (this._scale !== 1 && this._timeout === 0) {
      this.resetScale()
    } else if (this._timeout > 0) {
      this._timeout--
    }
  }
  static set scale(val) {
    this._scale = val
  }
  static get scale() {
    return this._scale
  }
  static setScaleTimeout({ scale, frame }) {
    this._scale = scale
    this._timeout = frame
  }
  static resetScale() {
    this._scale = 1
    this._scaledFrame = this._frame
  }
}
