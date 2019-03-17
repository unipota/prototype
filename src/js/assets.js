const path = 'assets/img'

export default class Assets {
  static init() {
    this.textures = {}
    this.fileNames = [
      'blanc/stand.json',
      'blanc/runRight.json',
      'blanc/runLeft.json',
      'blanc/runDown.json',
      'blanc/runDownLeft.json',
      'blanc/runDownRight.json',
      'blanc/runUp.json',
      'blanc/runUpLeft.json',
      'blanc/runUpRight.json',
      'map1.json'
    ]
  }
  static makeTextureFromFrame() {
    this.textures = {
      mychara: {
        STAND: {
          DOWN: [PIXI.Texture.fromFrame('blanc #stand 0.aseprite')],
          RIGHT: [PIXI.Texture.fromFrame('blanc #stand 1.aseprite')],
          UP: [PIXI.Texture.fromFrame('blanc #stand 2.aseprite')],
          LEFT: [PIXI.Texture.fromFrame('blanc #stand 3.aseprite')]
        },
        RUN: {
          RIGHT: [
            PIXI.Texture.fromFrame('blanc #runRight 0.aseprite'),
            PIXI.Texture.fromFrame('blanc #runRight 1.aseprite'),
            PIXI.Texture.fromFrame('blanc #runRight 2.aseprite'),
            PIXI.Texture.fromFrame('blanc #runRight 3.aseprite'),
            PIXI.Texture.fromFrame('blanc #runRight 4.aseprite'),
            PIXI.Texture.fromFrame('blanc #runRight 5.aseprite')
          ],
          LEFT: [
            PIXI.Texture.fromFrame('blanc #runLeft 0.aseprite'),
            PIXI.Texture.fromFrame('blanc #runLeft 1.aseprite'),
            PIXI.Texture.fromFrame('blanc #runLeft 2.aseprite'),
            PIXI.Texture.fromFrame('blanc #runLeft 3.aseprite'),
            PIXI.Texture.fromFrame('blanc #runLeft 4.aseprite'),
            PIXI.Texture.fromFrame('blanc #runLeft 5.aseprite')
          ],
          DOWN: [
            PIXI.Texture.fromFrame('blanc #runDown 0.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDown 1.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDown 2.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDown 3.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDown 4.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDown 5.aseprite')
          ],
          DOWN_LEFT: [
            PIXI.Texture.fromFrame('blanc #runDownLeft 0.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDownLeft 1.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDownLeft 2.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDownLeft 3.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDownLeft 4.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDownLeft 5.aseprite')
          ],
          DOWN_RIGHT: [
            PIXI.Texture.fromFrame('blanc #runDownRight 0.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDownRight 1.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDownRight 2.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDownRight 3.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDownRight 4.aseprite'),
            PIXI.Texture.fromFrame('blanc #runDownRight 5.aseprite')
          ],
          UP: [
            PIXI.Texture.fromFrame('blanc #runUp 0.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUp 1.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUp 2.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUp 3.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUp 4.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUp 5.aseprite')
          ],
          UP_LEFT: [
            PIXI.Texture.fromFrame('blanc #runUpLeft 0.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUpLeft 1.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUpLeft 2.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUpLeft 3.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUpLeft 4.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUpLeft 5.aseprite')
          ],
          UP_RIGHT: [
            PIXI.Texture.fromFrame('blanc #runUpRight 0.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUpRight 1.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUpRight 2.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUpRight 3.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUpRight 4.aseprite'),
            PIXI.Texture.fromFrame('blanc #runUpRight 5.aseprite')
          ]
        }
      },
      enemy: [PIXI.Texture.from(`${path}/enemy/enemy.png`)],
      bullet: [PIXI.Texture.from(`${path}/enemy/bullet.png`)],
      mapChip: [PIXI.Texture.fromFrame('map1 0')],
      item: {
        chestnut: [PIXI.Texture.from(`${path}/item/chestnut_1.png`)]
      }
    }
  }
}
