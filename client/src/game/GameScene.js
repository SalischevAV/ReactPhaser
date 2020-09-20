import Phaser from "phaser";
import background from '../assets/img/water.png';

class GameScene extends Phaser.Scene {

	constructor() {
		super({key : 'gameScene'});
	}

	init() {
		
	};

	preload() {
        this.load.image('background', background);
	}

	create() {
        var bg = this.add.sprite(0,0,'background');
        bg.setOrigin(0,0);

        var text = this.add.text(100,100, 'Game!');

	}

	update() {

	}


	end() {
		
	}

}
export default GameScene;