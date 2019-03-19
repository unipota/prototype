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
    this.entities[layerKey].push(entity)
    this.layers[layerKey].addChild(entity.sprite)
    // entity.index = index
    // console.log(this.entities[layerKey])
  }
  removeEntity({ entity, layerKey }) {
    const index = this.entities[layerKey].findIndex(e => e === entity)
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
  collisionDetect({ layerKey1, layerKey2, colliderKey }) {
    for (let index1 in this.entities[layerKey1]) {
      for (let index2 in this.entities[layerKey2]) {
        const e1 = this.entities[layerKey1][index1]
        const e2 = this.entities[layerKey2][index2]
        const c1 = e1.getCollider({ key: colliderKey })
        const c2 = e2.getCollider({ key: colliderKey })
        if (
          Math.abs(c1.position.x - c2.position.x) < c1.size.width / 2 + c2.size.width / 2 &&
          Math.abs(c1.position.y - c2.position.y) < c1.size.height / 2 + c2.size.height / 2
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
