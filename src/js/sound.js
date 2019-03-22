import pixiSound from 'pixi-sound'

export default class Sound {
  static init() {
    this.sound = pixiSound
    this.loader = new PIXI.loaders.Loader()
    this.assets = {}
    console.log('Sound init')
  }
  static loadAssets() {
    return new Promise(resolve => {
      this.loader.add('shockwave', 'assets/sound/shockwave.ogg')
      this.loader.add('field', 'assets/sound/field.ogg')
      this.loader.add('po', 'assets/sound/po.mp3')
      this.loader.add('charin', 'assets/sound/charin.mp3')
      this.loader.add('damage', 'assets/sound/damage.mp3')
      this.loader.load((loader, resources) => {
        this.assets = resources
        this.setVolume('po', 0.1)
        this.setVolume('damage', 0.5)
        console.log('Sound assets loaded')
        resolve()
      })
    })
  }
  static play(name) {
    this.getSound(name).play()
  }
  static stop(name) {
    this.getSound(name).stop()
  }
  static getSound(name) {
    return this.assets[name].sound || this.assets[name].data
  }
  static setLoop(name) {
    this.getSound(name).loop = true
  }
  static setVolume(name, volume) {
    this.getSound(name).volume = volume
  }
  static setReverbFilter(name) {
    this.getSound(name).filters = [new this.sound.filters.ReverbFilter()]
  }
  static clearFilters(name) {
    this.getSound(name).filters = null
  }
  static stopAll() {
    this.sound.stopAll()
  }
  static reset() {
    for (let sound in this.assets) {
      this.assets[sound].sound.filters = null
    }
  }
}
