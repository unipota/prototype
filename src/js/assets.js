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
      'blanc/runEffect/runRight.json',
      'blanc/runEffect/runLeft.json',
      'blanc/runEffect/runDown.json',
      'blanc/runEffect/runDownLeft.json',
      'blanc/runEffect/runDownRight.json',
      'blanc/runEffect/runUp.json',
      'blanc/runEffect/runUpLeft.json',
      'blanc/runEffect/runUpRight.json'
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
      effect: {
        RUN: {
          RIGHT: [
            PIXI.Texture.fromFrame('runEffect (effect) #runRight 0.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runRight 1.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runRight 2.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runRight 3.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runRight 4.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runRight 5.aseprite')
          ],
          LEFT: [
            PIXI.Texture.fromFrame('runEffect (effect) #runLeft 0.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runLeft 1.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runLeft 2.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runLeft 3.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runLeft 4.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runLeft 5.aseprite')
          ],
          DOWN: [
            PIXI.Texture.fromFrame('runEffect (effect) #runDown 0.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDown 1.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDown 2.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDown 3.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDown 4.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDown 5.aseprite')
          ],
          DOWN_LEFT: [
            PIXI.Texture.fromFrame('runEffect (effect) #runDownLeft 0.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDownLeft 1.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDownLeft 2.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDownLeft 3.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDownLeft 4.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDownLeft 5.aseprite')
          ],
          DOWN_RIGHT: [
            PIXI.Texture.fromFrame('runEffect (effect) #runDownRight 0.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDownRight 1.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDownRight 2.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDownRight 3.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDownRight 4.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runDownRight 5.aseprite')
          ],
          UP: [
            PIXI.Texture.fromFrame('runEffect (effect) #runUp 0.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUp 1.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUp 2.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUp 3.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUp 4.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUp 5.aseprite')
          ],
          UP_LEFT: [
            PIXI.Texture.fromFrame('runEffect (effect) #runUpLeft 0.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUpLeft 1.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUpLeft 2.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUpLeft 3.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUpLeft 4.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUpLeft 5.aseprite')
          ],
          UP_RIGHT: [
            PIXI.Texture.fromFrame('runEffect (effect) #runUpRight 0.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUpRight 1.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUpRight 2.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUpRight 3.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUpRight 4.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) #runUpRight 5.aseprite')
          ]
        }
      },
      enemy: [PIXI.Texture.from(`${path}/enemy/enemy.png`)],
      bullet: [PIXI.Texture.from(`${path}/enemy/bullet.png`)],
      mapChip: [
        PIXI.Texture.from(`${path}/map/map1.png`),
        PIXI.Texture.from(`${path}/map/map2.png`)
      ],
      item: {
        chestnut: [PIXI.Texture.from(`${path}/item/chestnut_1.png`)]
      },
      ui: {
        title: PIXI.Texture.from(`${path}/ui/title.png`)
      }
    }
  }
}
