import React, {useState, useEffect} from "react";
import Phaser from 'phaser';
// import config from '../../snake/config';
import SnakeScene from '../../snake/scenes/game';
import Menu from '../../snake/scenes/menu';

const config = {
  type: Phaser.CANVAS,
  width: 960,
  height: 720,
  backgroundColor: '#bfcc00',
  parent: 'game',
   scene: [ Menu, SnakeScene,]
}


function GameTable() {

 const game = new Phaser.Game(config);
//  game.scene.add('Game', new SnakeScene());

 game.scene.start(Menu); 
// game.scale.scaleMode = Phaser.Scale.RESIZE;
 
  

  useEffect(()=>{
    return(()=>game.destroy(true));
  });

  return (
    <div className="game" id='game'>
     
    </div>
  );
}

export default GameTable;