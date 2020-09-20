
import Phaser from "phaser";


class StartScene extends Phaser.Scene {

	constructor() {
        super({key:'startScene'});
        this.currentUser = localStorage.getItem('currentUser');
	}

	preload() {
		
	}

	create() {
          let text = this.add.text(300, 300, 'Start',{ fill: '#000' });
          text.setInteractive({ useHandCursor: true });

          text.on('pointerdown', () => this.clickButton());

          this.clickButton =()=>{
            this.scene.switch('gameScene');
        }
	}
          
	}



export default StartScene;