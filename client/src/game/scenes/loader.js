import fontConfig from '../bitmap-fonts';
import body from '../../assets/img/body.png';
import food from '../../assets/img/food.png';
import font from '../../assets/img/font.png';
import frame from '../../assets/img/frame.png';
import title from '../../assets/img/title.png';


export default class Loader extends Phaser.Scene {
  
  constructor() {
    super({key: 'Loader'});
  }

  
  preload() {
    this.load.image([body, font, food, frame, title]);
  }

 
  create(/* data */) {

    this.cache.bitmapFont.add(
      fontConfig.image,
      Phaser.GameObjects.RetroFont.Parse(this, fontConfig)
    );

    this.scene.start('Menu');
  }
}