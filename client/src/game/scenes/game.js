import frame from '../../assets/img/frame.png'
export default class Game extends Phaser.Scene {
    
    constructor() {
      super({key: 'Game'});
  
      this.highScore = 0;
    }
  
    init(/* data */) {
    
      this.points = 0;
    }
    create(/* data */) {
      //  Put the frame behind the maze.
      this.add.image(0, 0, frame).setOrigin(0, 0);
  
      //  Get a reference of the scenes to start.
      const scoreboard = this.scene.get('Scoreboard');
      const maze = this.scene.get('Maze');
  
      //  Run both scenes in parallel.
      this.scene
        .launch(scoreboard, {gameScene: this})
        .launch(maze);
  
      //  Add the game objects to the maze scene.
      this.food = maze.addFood(3, 4);
      this.snake = maze.addSnake(8, 8);
  
      //  Create our keyboard controls.
      this.cursors = this.input.keyboard.addKeys({
        leftKey: Phaser.Input.Keyboard.KeyCodes.LEFT,
        rightKey: Phaser.Input.Keyboard.KeyCodes.RIGHT
      });
    }
  
    update(time) {
      if (this.snake.alive) {
        this.updateInput();
        this.updateLogic(time);
      }
    }
  
    updateInput() {
      const {leftKey, rightKey} = this.cursors;

      if (Phaser.Input.Keyboard.JustDown(leftKey)) {
        this.snake.turnLeft();
      }
      else if (Phaser.Input.Keyboard.JustDown(rightKey)) {
        this.snake.turnRight();
      }
    }
  
  
    updateLogic(time) {
      const {food, snake} = this;
  
      if (snake.update(time)) {
        if (snake.collideWithFood(food, this.points)) {
          this.updatePoints();
          food.reposition(snake);
        }
      }
  
      if (!snake.alive) {
        this.endGame();
      }
    }
  
  
    endGame() {
      this.events.emit('snake-died');
  
  
      this.highScore = Math.max(this.points, this.highScore);

      this.time.delayedCall(2500, () => {
        this.scene
          .stop('Scoreboard')
          .stop('Maze')
          .start('Menu');
      });
    }
  

    updatePoints() {
      this.points += 5;
      this.events.emit('food-eaten', this.points);
    }
  }