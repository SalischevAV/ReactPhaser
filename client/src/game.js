import Phaser from "phaser";

import FinalSceneWin from './game/FinalSceneWin';
import FinalSceneLose from './game/FinalSceneLose';
import GameScene from '../src/game/GameScene';
import StartScene from '../src/game/StartScene';

const finalSceneWin = FinalSceneWin;
const finalSceneLose = FinalSceneLose;
const gameScene = GameScene;
const startScene = StartScene;

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  backgroundColor: '#bfcc00'
};

export const game = new Phaser.Game(config);


game.scene.add('startScene', startScene);
game.scene.add('gameScene', gameScene);
game.scene.add('finalSceneWin', finalSceneWin);
game.scene.add('finalSceneLose', finalSceneLose);

game.scene.start('startScene');


