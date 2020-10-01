import Phaser from 'phaser';

class Food extends Phaser.GameObjects.Image {
  constructor (scene, x, y, size) {
    super(scene, x * size + size / 2, y * size + size / 2, 'food');
  }
}

export default Food;

