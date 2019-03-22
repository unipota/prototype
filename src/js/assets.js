const path = 'assets/img'

export default class Assets {
  static init() {
    this.textures = {}
    this.fileNames = ['blanc/blanc.json', 'blanc/runEffect.json']
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
          DOWN: [
            PIXI.Texture.fromFrame('runEffect (effect) 0.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 1.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 2.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 3.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 4.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 5.aseprite')
          ],
          DOWN_RIGHT: [
            PIXI.Texture.fromFrame('runEffect (effect) 6.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 7.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 8.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 9.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 10.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 11.aseprite')
          ],
          RIGHT: [
            PIXI.Texture.fromFrame('runEffect (effect) 12.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 13.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 14.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 15.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 16.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 17.aseprite')
          ],
          UP_RIGHT: [
            PIXI.Texture.fromFrame('runEffect (effect) 18.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 19.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 20.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 21.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 22.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 23.aseprite')
          ],
          UP: [
            PIXI.Texture.fromFrame('runEffect (effect) 24.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 25.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 26.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 27.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 28.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 29.aseprite')
          ],
          UP_LEFT: [
            PIXI.Texture.fromFrame('runEffect (effect) 30.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 31.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 32.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 33.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 34.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 35.aseprite')
          ],
          LEFT: [
            PIXI.Texture.fromFrame('runEffect (effect) 36.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 37.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 38.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 39.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 40.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 41.aseprite')
          ],
          DOWN_LEFT: [
            PIXI.Texture.fromFrame('runEffect (effect) 42.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 43.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 44.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 45.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 46.aseprite'),
            PIXI.Texture.fromFrame('runEffect (effect) 47.aseprite')
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
        chestnut: [
          PIXI.Texture.from(`${path}/item/chestnut/eaten.png`),
          PIXI.Texture.from(`${path}/item/chestnut/normal.png`),
          PIXI.Texture.from(`${path}/item/chestnut/silver.png`),
          PIXI.Texture.from(`${path}/item/chestnut/gold.png`),
          PIXI.Texture.from(`${path}/item/chestnut/rainbow.png`),
          PIXI.Texture.from(`${path}/item/chestnut/uni.png`)
        ]
      },
      ui: {
        title: PIXI.Texture.from(`${path}/ui/title.png`),
        heart: [
          PIXI.Texture.from(`${path}/ui/heart.png`),
          PIXI.Texture.from(`${path}/ui/heart2.png`)
        ]
      }
    }
  }
}
