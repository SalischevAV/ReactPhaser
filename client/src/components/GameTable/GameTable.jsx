import React, {useState, useEffect} from "react";
import Phaser from 'phaser';
import SnakeScene from '../../snake/scenes/game';
import Menu from '../../snake/scenes/menu';
import GameOver from '../../snake/scenes/gameOver';
import GameWin from '../../snake/scenes/gameWin';

const config = {
  type: Phaser.CANVAS,
  width: 960,
  height: 720,
  backgroundColor: '#bfcc00',
  parent: 'game',
   scene: [ Menu, SnakeScene, GameOver, GameWin]
}


function GameTable() {
  
  const game = new Phaser.Game(config);
 game.scene.start(Menu); 
  

  useEffect(()=>{
    return(()=>game.destroy(true));
  });

  return (
    <div className="game" id='game'>
     
    </div>
  );
}

export default GameTable;