
import Phaser from "phaser";
import background from '../assets/img/water.png';

class StartScene extends Phaser.Scene {

	constructor() {
		super({key:'startScene'});
	}

	preload() {
		this.load.image('background', background);
	}

	create() {
		 var bg = this.add.sprite(0,0,'background');
		  bg.setOrigin(0,0);

		  var text = this.add.text(100,100, 'Welcome to my game!');
	}

}

export default StartScene;