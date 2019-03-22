export default class Text {
  static init() {
    this.styles = {
      normal: new PIXI.TextStyle({
        fontFamily: 'M+ 1c',
        fontSize: 24,
        fill: 0x101010,
        align: 'center'
      }),
      gradient: new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#F8CC4B'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
      })
    }
  }
  static makeText({ text, style }) {
    return new PIXI.Text(text, this.styles[style])
  }
}
