import title from '../../assets/img/title.png';
export default class Menu extends Phaser.Scene {
   
    constructor() {
      super({key: 'Menu'});
    }
  
    create(/* data */) {
  
      const x = this.cameras.main.width / 2;
      const y = this.cameras.main.height / 2;
  

      this.add.image(x, y - 80, title);
  
      //  Use a bitmap text object as the face of our start button.
      // const startButton = this.add.bitmapText(x - 160, y + 80, font, 'START')
      const startButton = this.add.text(x - 160, y + 80, 'CLICK TO START')
        .setOrigin(0.5, 1);
  
      //  Apply a blink effect to the button using a custom easing function.
      this.add.tween({
        targets: [startButton],
        ease: k => k < 0.5 ? 0 : 1,
        duration: 250,
        yoyo: true,
        repeat: -1,
        alpha: 0
      });
  
      //  Handle the click or tap of the button using an input zone slightly
      //  bigger than the text object.
      this.add.zone(
        startButton.x - (startButton.width * startButton.originX) - 16,
        startButton.y - (startButton.height * startButton.originY) - 16,
        startButton.width + 32,
        startButton.height + 32
      )
        .setOrigin(0, 0)
        .setInteractive()
        .once('pointerup', () => {
            this.scene.sleep('Menu');
            this.scene.switch('SnakeScene');
        });
        // .once('pointerup', () => this.scene.start('Game'));
  
      //  Get the last game high score.
    //   const {highScore} = this.scene.get('Game');
  
      //  Display the registered highest score of the game.
      //bitmapText(x: number, y: number, font: string, text?: string | string[], size?: number, align?: integer): Phaser.GameObjects.BitmapText;
      // this.add.bitmapText(x + 160, y + 80, font, 'HIGH SCORE')
      this.add.text(x + 160, y + 80, 'HIGH SCORE')
        .setOrigin(0.5, 1);
        // this.add.bitmapText(x + 160, y + 81, font, `${highScore} POINTS`)
    //   this.add.text(x + 160, y + 81, `${highScore} POINTS`)
      this.add.text(x + 160, y + 81, `POINTS`)
      // this.add.text(x + 160, y + 81, `${highScore} POINTS`)
        .setOrigin(0.5, 0);
    }
  }