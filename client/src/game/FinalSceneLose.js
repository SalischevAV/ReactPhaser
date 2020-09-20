import Phaser from "phaser";
class FinalSceneLose extends Phaser.Scene {

	constructor() {
		super({key:'finalSceneLose'});
	}

	preload() {
		
	}

	create() {
		  let text = this.add.text(100,100, 'By loser!');
	}

}

export default FinalSceneLose;