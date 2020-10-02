export default class GameWin extends Phaser.Scene {

    constructor() {
        super({ key: 'GameWin' });
    }

    create(/* data */) {

        console.log('GAME WIN')
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
            this.scene.start('SnakeScene');
        });

        newLevelButton.setInteractive()
        .once('pointerup', () => {
            this.scene.sleep('GameWin');
            this.scene.start('SnakeScene');
        });

        this.add.text(x, y + 300, 'HIGH SCORE')
            .setOrigin(0.5, 1);

        this.add.text(x, y + 299, `POINTS`)
            .setOrigin(0.5, 0);
    }
}