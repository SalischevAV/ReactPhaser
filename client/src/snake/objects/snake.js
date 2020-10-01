const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;



class Snake{
    constructor (scene, x, y, size) {
      this.headPosition = new Phaser.Geom.Point(x, y);
      this.body = scene.add.group();
      this.head = this.body.create(x * size, y * size, 'body');
      this.head.setOrigin(0);
      this.alive = true;
      this.speed = 100;
      this.moveTime = 0;
      this.tail = new Phaser.Geom.Point(x, y);
      this.heading = RIGHT;
      this.direction = RIGHT;
    }
  }

  export default Snake;