export default class GameOver extends Phaser.Scene {

  constructor() {
    super({ key: 'GameOver' });
  }

  create(/* data */) {

    console.log('GAME OVER')
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
        this.scene.start('SnakeScene');
      });

    this.add.text(x, y + 300, 'HIGH SCORE')
      .setOrigin(0.5, 1);

    this.add.text(x, y + 299, `POINTS`)
      .setOrigin(0.5, 0);
  }
}