import React from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import logoImg from "../../assets/img/logo.png";
// import {game} from '../../game';
import FinalScene from "../../game/FinalScene";
import GameScene from "../../game/GameScene";
import StartScene from "../../game/StartScene";

const Game = () => {
  return (
    <div className="game">

      <IonPhaser game={game} />
    </div>
  );
};

export default Game;


const game = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: "100%",
  height: "100%",
  scene: {
    preload: preload,
    create: create,    
  },
};




function preload() {
  this.load.image("logo", logoImg);
}

function create() {
  const logo = this.add.image(400, 150, "logo");

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
}
