export default class EntityManager {
  constructor() {
    this.entities = {}
    this.layers = {}
  }
  addLayer({ container, key }) {
    this.entities[key] = []
    this.layers[key] = container
  }
  addEntity({ entity, layerKey }) {
    this.layers[layerKey].addChild(entity.sprite)
    const index = this.layers[layerKey].getChildIndex(entity.sprite)
    this.entities[layerKey][index] = entity
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
          Math.abs(e1.position.x - e2.position.x) < e1.width / 2 + e2.width / 2 &&
          Math.abs(e1.position.y - e2.position.y) < e1.height / 2 + e2.height / 2
        ) {
          e1.hit(e2)
          e2.hit(e1)
        }
      }
    }
  }
  destroyAll() {
    for (let key in this.layers) {
      this.layers[key].destroy()
    }
  }
}
