const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

import food from '../../assets/img/coin.png';
import body from '../../assets/img/player.png';

import Food from '../objects/food';
import Snake from '../objects/snake';
import { GAME_END } from '../types';

import Phaser from 'phaser';


export default class SnakeScene extends Phaser.Scene {
  constructor(currentLevel=1) {
    super({
      key: 'SnakeScene',
    }); 
    this.size = 24;
    this.total = 0; 
    this.scoreText;
    this.currentLevelText;
  }

  init(props){
    const { level = 1 } = props; 
    this.currentLevel = level; 
  }

  preload() {
    this.load.image('food', food);
    this.load.image('body', body);
  }

  create() {
    this.food = new Food(this, 3, 4, this.size);
    this.children.add(this.food);
    this.snake = new Snake(this, 8, 8, this.size, 400/this.currentLevel);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.scoreText = this.add.text(16,16, 'Score: 0', {fontSize: '32px', fill: '#fff'});
    this.timeText = this.add.text(650, 16, 'Timer:', {fontSize: '32px', fill: '#fff'});
    this.currentLevelText = this.add.text(650, 45, 'Level:' + this.currentLevel, {fontSize: '32px', fill: '#fff'}); 
    this.delay = 30000;
    this.counter = this.delay/1000;
    
    
    this.time.delayedCall(this.delay, this.endGame.bind(this)); 

    this.time.addEvent({
      delay: 1000,               
      callback: ()=>{
        this.counter--;
        this.timeText.setText( 'Timer:' + this.counter)
      },
      loop: true
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
      return true;
    }
    else {
      return false;
    }
  }

  updateGrid(grid) {
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

    if(this.total > this.currentLevel*10-1){
      this.winGame();
    }

    var hitBody = Phaser.Actions.GetFirst(this.snake.body.getChildren(), { x: this.snake.head.x, y: this.snake.head.y }, 1);
    if (hitBody) {
      this.endGame();
    }
    else {
      this.snake.moveTime = time + this.snake.speed;
      return true;
    }
  }

  endGame(){
      this.snake.alive = false;
      this.scene.stop('SnakeScene');
      this.game.events.emit(GAME_END , {score: this.total}); 
      this.reset();
      this.currentLevel = 1;
      this.scene.switch('GameOver');
      return false;
  }

  winGame(){
    this.snake.alive = false;
    this.scene.stop('SnakeScene');
    this.game.events.emit(GAME_END , {score: this.total});
    this.reset();
    this.currentLevel += 1;
    this.scene.start('GameWin',{level:this.currentLevel});
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
      if (this.collideWithFood(this.food)) {
        this.repositionFood();
      }
    }
  }

  repositionFood() {
    let testGrid = [];

    for (var y = 0; y < 30; y++) {
      testGrid[y] = [];

      for (var x = 0; x < 40; x++) {
        testGrid[y][x] = true;
      }
    }

    this.updateGrid(testGrid);

    let validLocations = [];

    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 40; x++) {
        if (testGrid[y][x] === true) {
          validLocations.push({ x: x, y: y });
        }
      }
    }

    if (validLocations.length > 0) {
      const pos = Phaser.Math.RND.pick(validLocations);
      this.food.setPosition(pos.x * this.size + this.size / 2, pos.y * this.size + this.size / 2);
      return true;
    }
    else {
      return false;
    }
  }
}