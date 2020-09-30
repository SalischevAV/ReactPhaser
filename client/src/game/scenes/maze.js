import {WIDTH, HEIGHT, LENGTH} from '../grid';
import Food from '../objects/Food';
import Snake from '../objects/Snake';

export default class Maze extends Phaser.Scene {

  constructor() {
    super({
      key: 'Maze',

      cameras: [{
        x: LENGTH / 2,
        y: 2 * LENGTH,
        width: WIDTH * LENGTH,
        height: HEIGHT * LENGTH
      }]
    });
  }

 
  addFood(x = 0, y = x) {
    return new Food(this, x, y);
  }

  addSnake(x = 0, y = x) {
    return new Snake(this, x, y);
  }
}