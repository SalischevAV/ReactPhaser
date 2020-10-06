export default class GameOver extends Phaser.Scene {

  constructor() {
    super({ key: 'GameOver' });
  }

  init(){
    this.highScore = localStorage.getItem('highScore');
  }
  create(/* data */) {
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height / 2;


    this.add.text(x - 80, y - 80, 'Game Over');

    const startButton = this.add.text(x - 160, y + 80, 'CLICK TO RESTART')
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
        this.scene.sleep('GameOver');
        this.scene.start('SnakeScene',  {level:1});
      });

      const raitingButton = this.add.text(x, y + 299, `RAITING`)
      .setOrigin(0.5, 0);

      raitingButton.setInteractive()
      .once('pointerup', () => {
          this.scene.sleep('Menu');
          this.scene.start('Raiting', {scene: 'GameOver'});
      });
  }
}