export default class Menu extends Phaser.Scene {
   
    constructor() {
      super({key: 'Menu'});
    }
    
    create(/* data */) {
  
      const x = this.cameras.main.width / 2;
      const y = this.cameras.main.height / 2;
  

      this.add.text(x- 80, y - 80, 'SNAKE GAME');
 
      const startButton = this.add.text(x - 160, y + 80, 'CLICK TO START')
        .setOrigin(0.5, 1);
  
      this.add.tween({
        targets: [startButton],
        ease: k => k < 0.5 ? 0 : 1,
        duration: 250,
        yoyo: true,
        repeat: -1,
        alpha: 0
      });
  
      startButton.setInteractive()
      .once('pointerup', () => {
          this.scene.sleep('Menu');
          this.scene.start('SnakeScene');
      });


        this.add.text(x, y + 299, `RAITING`)
            .setOrigin(0.5, 0);
    }
  }