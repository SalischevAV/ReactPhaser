import Phaser from "phaser";
import logoImg from "../src/assets/img/logo.png";

import FinalScene from '../src/game/FinalScene';
import GameScene from '../src/game/GameScene';
import StartScene from '../src/game/StartScene';

const finalScene = FinalScene;
const gameScene = GameScene;
const startScene = StartScene;

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: '100%',
  height: '100%',
  // scene: {
  //   preload: preload,
  //   create: create
  // }
};

// const game = new Phaser.Game(config);
// console.log(game)

// game.scene.add('startScene', startScene);
// game.scene.add('gameScene', gameScene)
// game.scene.add('finalScene', finalScene)

// game.scene.start('startScene');

// function preload() {
//   this.load.image("logo", logoImg);
// }

// function create() {
//   const logo = this.add.image(400, 150, "logo");

//   this.tweens.add({
//     targets: logo,
//     y: 450,
//     duration: 2000,
//     ease: "Power2",
//     yoyo: true,
//     loop: -1
//   });
// }
