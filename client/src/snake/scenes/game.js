const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

import food from '../../assets/img/coin.png';
import body from '../../assets/img/player.png';

import Food from '../objects/food';
import Snake from '../objects/snake';

import Phaser from 'phaser';


export default class SnakeScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'SnakeScene',
    }); 
    this.size = 24;
    this.total = 0; 
    this.scoreText;
  }

  

  preload() {
    this.load.image('food', food);
    this.load.image('body', body);
  }

  create() {
    console.log('GAME')
    this.food = new Food(this, 3, 4, this.size);
    this.children.add(this.food);
    this.snake = new Snake(this, 8, 8, this.size);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.scoreText = this.add.text(16,16, 'Score: 0', {fontSize: '32px', fill: '#fff'});
    this.timeText = this.add.text(650, 16, 'Timer:', {fontSize: '32px', fill: '#fff'});
    this.delay = 30000;
    this.counter = this.delay/1000;
    
    

    // this.time.delayedCall(2000, ()=>console.log(this.snake)); 
    this.time.delayedCall(this.delay, this.endGame.bind(this)); 

    this.time.addEvent({
      delay: 1000,               
      callback: ()=>{
        this.counter--;
        this.timeText.setText( 'Timer:' + this.counter)
      },
      loop: true
  });


    this.input.on('pointerdown', () => {
      if (!this.snake.alive) {
        this.reset();
        this.game.events.emit(RESET_SCORE);
        this.game.events.emit(GAME_START);
      } 
    });
  }

  reset() {
    this.children.removeAll();
    this.total = 0;
    this.food = new Food(this, 3, 4, this.size);
    this.children.add(this.food);
    this.snake = new Snake(this, 8, 8, this.size);
  }

  eat() {
    this.total = this.total + 10;
    this.scoreText.setText('Score: ' + this.total);
  }

  snakeUpdate(time) {
    if (time >= this.snake.moveTime) {
      return this.move(time);
    }
  }

  grow() {
    var newPart = this.snake.body.create(this.snake.tail.x, this.snake.tail.y, 'body'); 
    newPart.setOrigin(0);
  }

  collideWithFood(food) {
    if (food.x - this.size <= this.snake.head.x && this.snake.head.x <= food.x
      && food.y - this.size <= this.snake.head.y && this.snake.head.y <= food.y) {
      this.grow();
      this.eat();
      //  For every 5 items of food eaten we'll increase the snake speed a little
      if (this.snake.speed > 20 && this.total % 5 === 0) {
        this.snake.speed -= 5;
      }

      // this.game.events.emit(INCREASE_SCORE, this.total);
      return true;
    }
    else {
      return false;
    }
  }

  updateGrid(grid) {
    //  Remove all body pieces from valid positions list
    this.snake.body.children.each((segment) => {
      var bx = segment.x / this.size;
      var by = segment.y / this.size;
      grid[by][bx] = false;
    });
    return grid;
  }

  faceLeft() {
    if (this.snake.direction === UP || this.snake.direction === DOWN) {
      this.snake.heading = LEFT;
    }
  }

  faceRight() {
    if (this.snake.direction === UP || this.snake.direction === DOWN) {
      this.snake.heading = RIGHT;
    }
  }

  faceUp() {
    if (this.snake.direction === LEFT || this.snake.direction === RIGHT) {
      this.snake.heading = UP;
    }
  }

  faceDown() {
    if (this.snake.direction === LEFT || this.snake.direction === RIGHT) {
      this.snake.heading = DOWN;
    }
  }

  move(time) {
    if(!this.snake.alive) {
      return false;
    }
    switch (this.snake.heading) {
      case LEFT:
        this.snake.headPosition.x = Phaser.Math.Wrap(this.snake.headPosition.x - 1, 0, 40);
        break;
      case RIGHT:
        this.snake.headPosition.x = Phaser.Math.Wrap(this.snake.headPosition.x + 1, 0, 40);
        break;
      case UP:
        this.snake.headPosition.y = Phaser.Math.Wrap(this.snake.headPosition.y - 1, 0, 30);
        break;
      case DOWN:
        this.snake.headPosition.y = Phaser.Math.Wrap(this.snake.headPosition.y + 1, 0, 30);
        break;
    }

    this.snake.direction = this.snake.heading;

    //  Update the body segments and place the last coordinate into this.tail
    Phaser.Actions.ShiftPosition(this.snake.body.getChildren(), this.snake.headPosition.x * this.size, this.snake.headPosition.y * this.size, 1, this.snake.tail);

    if(this.total > 19){
      this.winGame();
    }

    var hitBody = Phaser.Actions.GetFirst(this.snake.body.getChildren(), { x: this.snake.head.x, y: this.snake.head.y }, 1);
    if (hitBody) {
      // this.snake.alive = false;
      // this.scene.stop('SnakeScene');
      // this.scene.switch('GameOver');
      // // this.game.events.emit(GAME_END);
      // return false;
      this.endGame();
    }
    else {
      //  Update the timer ready for the next movement
      this.snake.moveTime = time + this.snake.speed;
      return true;
    }
  }

  endGame(){
      this.snake.alive = false;
      this.scene.stop('SnakeScene');
      this.reset();
      console.log(this.total);
      this.scene.switch('GameOver');
      // this.game.events.emit(GAME_END);
      return false;
  }

  winGame(){
    this.snake.alive = false;
    this.scene.stop('SnakeScene');
    this.reset();
    console.log(this.total);
    this.scene.switch('GameWin');
    // this.game.events.emit(GAME_END);
    return false;
}

  update(time, delta){
    if (this.cursors.left.isDown) {
      this.faceLeft();
    }
    else if (this.cursors.right.isDown) {
      this.faceRight();
    }
    else if (this.cursors.up.isDown) {
      this.faceUp();
    }
    else if (this.cursors.down.isDown) {
      this.faceDown();
    }

    if (this.snakeUpdate(time)) {
      //  If the snake updated, we need to check for collision against food
      if (this.collideWithFood(this.food)) {
        this.repositionFood();
      }
    }
  }

  repositionFood() {
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    let testGrid = [];

    for (var y = 0; y < 30; y++) {
      testGrid[y] = [];

      for (var x = 0; x < 40; x++) {
        // @ts-ignore
        testGrid[y][x] = true;
      }
    }

    this.updateGrid(testGrid);

    //  Purge out false positions
    let validLocations = [];

    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 40; x++) {
        if (testGrid[y][x] === true) {
          //  Is this position valid for food? If so, add it here ...
          validLocations.push({ x: x, y: y });
        }
      }
    }

    if (validLocations.length > 0) {
      //  Pick a random food position
      const pos = Phaser.Math.RND.pick(validLocations);
      this.food.setPosition(pos.x * this.size + this.size / 2, pos.y * this.size + this.size / 2);
      return true;
    }
    else {
      return false;
    }
  }
}