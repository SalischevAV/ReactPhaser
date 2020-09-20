import Phaser from "phaser";
import body from '../assets/img/player.png';
import food from '../assets/img/coin.png';

class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'gameScene' });
        this.snake;
        this.food;
        this.cursors;

        //  Direction consts
        this.UP = 0;
        this.DOWN = 1;
        this.LEFT = 2;
        this.RIGHT = 3;
    }


    preload() {
        this.load.image('body', body);
        this.load.image('food', food);
    }

    create() {
        let Food = new Phaser.Class({

            Extends: Phaser.GameObjects.Image,

            initialize:

                function Food(scene, x, y) {
                    Phaser.GameObjects.Image.call(this, scene)

                    this.setTexture('food');
                    this.setPosition(x * 16, y * 16);
                    this.setOrigin(0);

                    this.total = 0;

                    scene.children.add(this);
                },

            eat: function () {
                this.total++;
            }

        });

        let Snake = new Phaser.Class({

            initialize:

                function Snake(scene, x, y) {
                    this.headPosition = new Phaser.Geom.Point(x, y);

                    this.body = scene.add.group();

                    this.head = this.body.create(x * 16, y * 16, 'body');
                    this.head.setOrigin(0);

                    this.alive = true;

                    this.speed = 100;

                    this.moveTime = 0;

                    this.tail = new Phaser.Geom.Point(x, y);

                    this.heading = this.RIGHT;
                    this.direction = this.RIGHT;
                },

            update: function (time) {
                if (time >= this.moveTime) {
                    return this.move(time);
                }
            },

            faceLeft: function () {
                if (this.direction === this.UP || this.direction === this.DOWN) {
                    this.heading = this.LEFT;
                }
            },

            faceRight: function () {
                if (this.direction === this.UP || this.direction === this.DOWN) {
                    this.heading = this.RIGHT;
                }
            },

            faceUp: function () {
                if (this.direction === this.LEFT || this.direction === this.RIGHT) {
                    this.heading = this.UP;
                }
            },

            faceDown: function () {
                if (this.direction === this.LEFT || this.direction === this.RIGHT) {
                    this.heading = this.DOWN;
                }
            },

            move: function (time) {
                switch (this.heading) {
                    case this.LEFT:
                        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
                        break;

                    case this.RIGHT:
                        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
                        break;

                    case this.UP:
                        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);
                        break;

                    case this.DOWN:
                        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);
                        break;
                }

                this.direction = this.heading;

                //  Update the body segments and place the last coordinate into this.tail
                Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);

                //  Check to see if any of the body pieces have the same x/y as the head
                //  If they do, the head ran into the body

                var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);

                if (hitBody) {
                    console.log('dead');

                    this.alive = false;

                    return false;
                }
                else {
                    //  Update the timer ready for the next movement
                    this.moveTime = time + this.speed;

                    return true;
                }
            },

            grow: function () {
                var newPart = this.body.create(this.tail.x, this.tail.y, 'body');

                newPart.setOrigin(0);
            },

            collideWithFood: function (food) {
                if (this.head.x === food.x && this.head.y === food.y) {
                    this.grow();

                    food.eat();

                    //  For every 5 items of food eaten we'll increase the snake speed a little
                    if (this.speed > 20 && food.total % 5 === 0) {
                        this.speed -= 5;
                    }

                    return true;
                }
                else {
                    return false;
                }
            },

            updateGrid: function (grid) {
                //  Remove all body pieces from valid positions list
                this.body.children.each(function (segment) {

                    var bx = segment.x / 16;
                    var by = segment.y / 16;

                    grid[by][bx] = false;

                });

                return grid;
            }

        });

        this.food = new Food(this, 3, 4);

        this.snake = new Snake(this, 8, 8);

        //  Create our keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        if (!this.snake.alive) {
            return;
        }

        if (this.cursors.left.isDown) {
            this.snake.faceLeft();
        }
        else if (this.cursors.right.isDown) {
            this.snake.faceRight();
        }
        else if (this.cursors.up.isDown) {
            this.snake.faceUp();
        }
        else if (this.cursors.down.isDown) {
            this.snake.faceDown();
        }

        if (this.snake.update(time)) {

            if (this.snake.collideWithFood(this.food)) {
                repositionFood();
            }
        }
    }

    repositionFood() {

        var testGrid = [];

        for (var y = 0; y < 30; y++) {
            testGrid[y] = [];

            for (var x = 0; x < 40; x++) {
                testGrid[y][x] = true;
            }
        }

        snake.updateGrid(testGrid);

        //  Purge out false positions
        var validLocations = [];

        for (var y = 0; y < 30; y++) {
            for (var x = 0; x < 40; x++) {
                if (testGrid[y][x] === true) {
                    //  Is this position valid for food? If so, add it here ...
                    validLocations.push({ x: x, y: y });
                }
            }
        }

        if (validLocations.length > 0) {
            //  Use the RNG to pick a random food position
            var pos = Phaser.Math.RND.pick(validLocations);

            //  And place it
            this.food.setPosition(pos.x * 16, pos.y * 16);

            return true;
        }
        else {
            return false;
        }
    }


    end() {

    }

}
export default GameScene;