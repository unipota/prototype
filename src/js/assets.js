const path = 'assets/img'

export default class Assets {
  static init() {
    this.textures = {}
    this.fileNames = [
      'blanc/blanc.json',
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
          DOWN: [PIXI.Texture.fromFrame('blanc 0.aseprite')],
          DOWN_RIGHT: [PIXI.Texture.fromFrame('blanc 1.aseprite')],
          RIGHT: [PIXI.Texture.fromFrame('blanc 2.aseprite')],
          UP_RIGHT: [PIXI.Texture.fromFrame('blanc 3.aseprite')],
          UP: [PIXI.Texture.fromFrame('blanc 4.aseprite')],
          UP_LEFT: [PIXI.Texture.fromFrame('blanc 5.aseprite')],
          LEFT: [PIXI.Texture.fromFrame('blanc 6.aseprite')],
          DOWN_LEFT: [PIXI.Texture.fromFrame('blanc 7.aseprite')]
        },
        RUN: {
          RIGHT: [
            PIXI.Texture.fromFrame('blanc 20.aseprite'),
            PIXI.Texture.fromFrame('blanc 21.aseprite'),
            PIXI.Texture.fromFrame('blanc 22.aseprite'),
            PIXI.Texture.fromFrame('blanc 23.aseprite'),
            PIXI.Texture.fromFrame('blanc 24.aseprite'),
            PIXI.Texture.fromFrame('blanc 25.aseprite')
          ],
          LEFT: [
            PIXI.Texture.fromFrame('blanc 44.aseprite'),
            PIXI.Texture.fromFrame('blanc 45.aseprite'),
            PIXI.Texture.fromFrame('blanc 46.aseprite'),
            PIXI.Texture.fromFrame('blanc 47.aseprite'),
            PIXI.Texture.fromFrame('blanc 48.aseprite'),
            PIXI.Texture.fromFrame('blanc 49.aseprite')
          ],
          DOWN: [
            PIXI.Texture.fromFrame('blanc 8.aseprite'),
            PIXI.Texture.fromFrame('blanc 9.aseprite'),
            PIXI.Texture.fromFrame('blanc 10.aseprite'),
            PIXI.Texture.fromFrame('blanc 11.aseprite'),
            PIXI.Texture.fromFrame('blanc 12.aseprite'),
            PIXI.Texture.fromFrame('blanc 13.aseprite')
          ],
          DOWN_LEFT: [
            PIXI.Texture.fromFrame('blanc 50.aseprite'),
            PIXI.Texture.fromFrame('blanc 51.aseprite'),
            PIXI.Texture.fromFrame('blanc 52.aseprite'),
            PIXI.Texture.fromFrame('blanc 53.aseprite'),
            PIXI.Texture.fromFrame('blanc 54.aseprite'),
            PIXI.Texture.fromFrame('blanc 55.aseprite')
          ],
          DOWN_RIGHT: [
            PIXI.Texture.fromFrame('blanc 14.aseprite'),
            PIXI.Texture.fromFrame('blanc 15.aseprite'),
            PIXI.Texture.fromFrame('blanc 16.aseprite'),
            PIXI.Texture.fromFrame('blanc 17.aseprite'),
            PIXI.Texture.fromFrame('blanc 18.aseprite'),
            PIXI.Texture.fromFrame('blanc 19.aseprite')
          ],
          UP: [
            PIXI.Texture.fromFrame('blanc 32.aseprite'),
            PIXI.Texture.fromFrame('blanc 33.aseprite'),
            PIXI.Texture.fromFrame('blanc 34.aseprite'),
            PIXI.Texture.fromFrame('blanc 35.aseprite'),
            PIXI.Texture.fromFrame('blanc 36.aseprite'),
            PIXI.Texture.fromFrame('blanc 37.aseprite')
          ],
          UP_LEFT: [
            PIXI.Texture.fromFrame('blanc 38.aseprite'),
            PIXI.Texture.fromFrame('blanc 39.aseprite'),
            PIXI.Texture.fromFrame('blanc 40.aseprite'),
            PIXI.Texture.fromFrame('blanc 41.aseprite'),
            PIXI.Texture.fromFrame('blanc 42.aseprite'),
            PIXI.Texture.fromFrame('blanc 43.aseprite')
          ],
          UP_RIGHT: [
            PIXI.Texture.fromFrame('blanc 26.aseprite'),
            PIXI.Texture.fromFrame('blanc 27.aseprite'),
            PIXI.Texture.fromFrame('blanc 28.aseprite'),
            PIXI.Texture.fromFrame('blanc 29.aseprite'),
            PIXI.Texture.fromFrame('blanc 30.aseprite'),
            PIXI.Texture.fromFrame('blanc 31.aseprite')
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
