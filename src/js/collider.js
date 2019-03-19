export class Collider {
  constructor() {
    this.colliders = {}
  }
  addCollider({ key, collider }) {
    this.colliders[key] = collider
  }
  removeCollider({ key }) {
    delete this.colliders[key]
  }
  getCollider({ key, x, y }) {
    this.colliders[key].position = { x, y }
    return this.colliders[key]
  }
}

export class RectCollider {
  constructor({ width, height }) {
    this._padding = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
    this._x = 0
    this._y = 0
    this._width = width
    this._height = height
  }
  set position({ x, y }) {
    this._x = x
    this._y = y
  }
  get position() {
    return {
      x: this._x + this._padding.left,
      y: this._y + this._padding.top
    }
  }
  set padding({ top, left, right, bottom }) {
    this._padding = { top, left, right, bottom }
  }
  get size() {
    return {
      width: this._width - this._padding.left - this._padding.right,
      height: this._height - this._padding.top - this._padding.bottom
    }
  }
}
