
export default class GameWin extends Phaser.Scene {

    constructor() {
        super({ key: 'GameWin' });
    }

    init(props){
        const level  = props; 
        this.currentLevel = level;  
      }

    create() {
        const x = this.cameras.main.width / 2;
        const y = this.cameras.main.height / 2;


        this.add.text(x - 80, y - 80, 'Level win');

       
        const startButton = this.add.text(x - 160, y + 80, 'CLICK TO RESTART')
            .setOrigin(0.5, 1);

        const newLevelButton = this.add.text(x + 160, y + 80, 'CLICK TO NEW LEVEL')
            .setOrigin(0.5, 1);

    
        this.add.tween({
            targets: [startButton],
            ease: k => k < 0.5 ? 0 : 1,
            duration: 250,
            yoyo: true,
            repeat: -1,
            alpha: 0
        });

        this.add.tween({
            targets: [newLevelButton],
            ease: k => k < 0.5 ? 0 : 1,
            duration: 250,
            yoyo: true,
            repeat: -1,
            alpha: 0
        });

        startButton.setInteractive()
        .once('pointerup', () => {
            this.scene.sleep('GameWin');
            this.scene.start('SnakeScene', {level:1});
        });

        newLevelButton.setInteractive()
        .once('pointerup', () => {
            this.scene.sleep('GameWin');
            this.scene.start('SnakeScene',  this.currentLevel);
        });

        const raitingButton = this.add.text(x, y + 299, `RAITING`)
            .setOrigin(0.5, 0);

            raitingButton.setInteractive()
            .once('pointerup', () => {
                this.scene.sleep('Menu');
                this.scene.start('Raiting', {scene: 'GameWin'});
            });
    }
}