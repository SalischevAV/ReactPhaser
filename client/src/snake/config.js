import SnakeScene from './scenes/game'

const config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 720,
    backgroundColor: '#bfcc00',
    parent: 'game',
     scene: [SnakeScene]
  }

  export default config;