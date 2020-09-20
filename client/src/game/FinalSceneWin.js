import Phaser from "phaser";
class FinalSceneWin extends Phaser.Scene {

	constructor() {
		super({key:'finalSceneWin'});
	}

	preload() {
	}

	create() {
		 let text = this.add.text(100,100, 'By winner!');
	}

}

export default FinalSceneWin;