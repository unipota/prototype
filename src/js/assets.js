export default class Assets {
  static init() {
    this.textures = {}
    this.fileNames = [
      'blanc/blanc.json',
      'blanc/runRight.json',
      'blanc/runLeft.json',
      'blanc/runDown.json',
      'blanc/runUp.json',
      'map1.json'
    ]
  }
  static makeTextureFromFrame() {
    this.textures = {
      mychara: {
        down: PIXI.Texture.fromFrame('blanc 0.aseprite'),
        right: PIXI.Texture.fromFrame('blanc 1.aseprite'),
        up: PIXI.Texture.fromFrame('blanc 2.aseprite'),
        left: PIXI.Texture.fromFrame('blanc 3.aseprite'),
        run: {
          right: [
            PIXI.Texture.fromFrame('blanc #runRight 0.aseprite'),
            PIXI.Texture.fromFrame('blanc #runRight 1.aseprite'),
            PIXI.Texture.fromFrame('blanc #runRight 2.aseprite'),
            PIXI.Texture.fromFrame('blanc #runRight 3.aseprite'),
            PIXI.Texture.fromFrame('blanc #runRight 4.aseprite'),
            PIXI.Texture.fromFrame('blanc #runRight 5.aseprite')
          ],
          left: [
            PIXI.Texture.fromFrame('blanc #runLeft 0.aseprite'),
            PIXI.Texture.fromFrame('blanc #runLeft 1.aseprite'),
            PIXI.Texture.fromFrame('blanc #runLeft 2.aseprite'),
            PIXI.Texture.fromFrame('blanc #runLeft 3.aseprite'),
            PIXI.Texture.fromFrame('blanc #runLeft 4.aseprite'),
            PIXI.Texture.fromFrame('blanc #runLeft 5.aseprite')
          ],
          down: [
            PIXI.Texture.fromFrame('blanc #runDown 0.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDown 1.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDown 2.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDown 3.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDown 4.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDown 5.aseprite')
          ],
          up: [
            PIXI.Texture.fromFrame('blanc #runUp 0.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUp 1.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUp 2.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUp 3.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUp 4.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUp 5.aseprite')
          ]
        }
      },
      mapChip: [PIXI.Texture.fromFrame('map1 0')]
    }
  }
}
