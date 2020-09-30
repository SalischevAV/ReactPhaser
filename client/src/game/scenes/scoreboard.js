import {WIDTH, LENGTH} from '../grid.js';
import fontConfig from '../bitmap-fonts.js';

export default class Scoreboard extends Phaser.Scene {
  constructor() {
    super({
      key: 'Scoreboard',
      cameras: [{
        x: LENGTH / 2,
        y: LENGTH / 2,
        width: WIDTH * LENGTH,
        height: LENGTH
      }]
    });
  }

  init({gameScene}) {
    //  Bind the maze events to update the score board.
    gameScene.events
      .on('food-eaten', points => this.setScore(points))
      .on('snake-died', () => this.showGameOver());
  }

  create(/* data */) {
    this.scoreLabel = this.add.bitmapText(0, 0, fontConfig.image, '0');

    this.gameOverLabel =
      this.add.bitmapText(WIDTH * LENGTH, 0, fontConfig.image, 'GAME OVER')
        .setOrigin(1, 0)
        .setVisible(false);
  }

  setScore(points) {
    this.scoreLabel.setText(String(points));
  }

  showGameOver() {
    this.gameOverLabel.setVisible(true);
  }
}