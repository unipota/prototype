export default class Sound {
  static init() {
    this.loader = new PIXI.loaders.Loader()
    this.assets = {}
    console.log('Sound init')
  }
  static loadAssets() {
    return new Promise(resolve => {
      this.loader.add('shockwave', 'assets/sound/shockwave.ogg')
      this.loader.add('field', 'assets/sound/field.ogg')
      this.loader.load((loader, resources) => {
        this.assets = resources
        console.log('Sound assets loaded')
        resolve()
      })
    })
  }
  static play(name) {
    this.getSound(name).play()
  }
  static stop(name) {
    if (this.getSound(name).loop) {
      this.getSound(name).stop()
    }
  }
  static getSound(name) {
    return this.assets[name].sound || this.assets[name].data
  }
}
