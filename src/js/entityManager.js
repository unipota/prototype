export default class EntityManager {
  constructor() {
    this.entities = {}
    this.layers = {}
  }
  addLayer({ container, key }) {
    this.entities[key] = {}
    this.layers[key] = container
  }
  addEntity({ entity, layerKey }) {
    this.layers[layerKey].addChild(entity.sprite)
    const index = this.layers[layerKey].getChildIndex(entity.sprite)
    entity.index = index
    this.entities[layerKey][index] = entity
  }
  removeEntity({ index, layerKey }) {
    this.layers[layerKey].removeChild(this.entities[layerKey][index])
    this.entities[layerKey][index].destroy()
    delete this.entities[layerKey][index]
  }
  updateAll() {
    for (let key in this.entities) {
      for (let index in this.entities[key]) {
        this.entities[key][index].update()
      }
    }
  }
  collisionCheck({ layerKey1, layerKey2 }) {
    for (let index1 in this.entities[layerKey1]) {
      for (let index2 in this.entities[layerKey2]) {
        const e1 = this.entities[layerKey1][index1]
        const e2 = this.entities[layerKey2][index2]
        if (
          Math.abs(e1.hitRectPosition.x - e2.hitRectPosition.x) <
            e1.hitRectSize.width / 2 + e2.hitRectSize.width / 2 &&
          Math.abs(e1.hitRectPosition.y - e2.hitRectPosition.y) <
            e1.hitRectSize.height / 2 + e2.hitRectSize.height / 2
        ) {
          e1.hit(e2)
          e2.hit(e1)
        }
      }
    }
  }
  destroyAll() {
    for (let key in this.entities) {
      for (let index in this.entities[key]) {
        this.entities[key][index].destroy()
      }
    }
    for (let key in this.layers) {
      this.layers[key].destroy()
    }
  }
}
