import Phaser from "phaser";
import body from '../assets/img/player.png';
import food from '../assets/img/coin.png';

class GameScene extends Phaser.Scene {
    constructor() {
        super();
        this.player = null;
        this.foods = null;
        this.food = null;
        this.foodCount = 0;
    }

    preload() {
        this.load.image('body', body);
        this.load.image('food', food);
    }

    create() {


        this.player = this.physics.add.image(500, 500, 'body');
        this.player.setCollideWorldBounds(true);

        this.food = this.physics.add.image(200, 500, 'food');

        this.physics.add.overlap(this.player, this.food, this.collectFood, null, this);
    }

    update() {
        let cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);

        }
        else if (cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);

        }
        else if (cursors.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.setVelocityX(0);

        }
        else if (cursors.down.isDown) {
            this.player.setVelocityY(160);
            this.player.setVelocityX(0);

        }

    }

    collectFood(player, food) {
        this.food.disableBody(true, true);
        this.food=null;
        this.foodCount += 1;
        this.food = this.physics.add.image(200, 200, 'food');
        console.log(this.foodCount)

    }
}
export default GameScene;