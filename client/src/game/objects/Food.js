import {WIDTH, HEIGHT, LENGTH} from '../grid';

export default class Snake {
 
  constructor(scene, x, y) {
    this.body = scene.add.group({
      defaultKey: 'body',
      createCallback: o => o.setOrigin(0)
    });

    this.head = this.body.create(x * LENGTH, y * LENGTH);

    this.direction = new Phaser.Geom.Point(LENGTH, 0);
    this.headPosition = new Phaser.Geom.Point(0, 0);
    this.tailPosition = new Phaser.Geom.Point(0, 0);

    this.alive = true;
    this.updated = true;
    this.moveTime = 0;
    this.moveDelay = 100;
  }

 
  update(time) {
    if (time >= this.moveTime) {
      this.updated = true;
      return this.move(time);
    }

    return false;
  }

  turnLeft() {
    if (this.updated) {
      this.direction.setTo(this.direction.y, -this.direction.x);

      this.updated = false;
    }
  }

 
  turnRight() {
    if (this.updated) {
      this.direction.setTo(-this.direction.y, this.direction.x);

      this.updated = false;
    }
  }

  hitBody() {
    return Phaser.Actions.GetFirst(
      this.body.children.entries,
      {x: this.head.x, y: this.head.y},
      1
    );
  }

 
  move(time) {
  
    this.headPosition.setTo(
      Phaser.Math.Wrap(this.head.x + this.direction.x, 0, WIDTH * LENGTH),
      Phaser.Math.Wrap(this.head.y + this.direction.y, 0, HEIGHT * LENGTH)
    );

  
    Phaser.Actions.ShiftPosition(
      this.body.children.entries,
      this.headPosition.x,
      this.headPosition.y,
      1,
      this.tailPosition
    );

 
    if (this.hitBody()) {
      this.alive = false;
      return false;
    }

    this.moveTime = time + this.moveDelay;

    return true;
  }

 
  grow() {
    this.body.create(this.tailPosition.x, this.tailPosition.y);
  }

  collideWithFood(food, points) {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.grow();

      
      if (this.moveDelay > 20 && points % 25 === 0) {
        this.moveDelay -= 5;
      }

      return true;
    }

    return false;
  }

  updateGrid(grid) {
    //  Remove all body pieces from valid positions list.
    for (const segment of this.body.getChildren()) {
      const x = segment.x / LENGTH;
      const y = segment.y / LENGTH;

      grid[y][x] = false;
    }

    return grid;
  }
}