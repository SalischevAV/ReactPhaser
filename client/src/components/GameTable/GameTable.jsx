import React, {useState, useEffect} from "react";
import Phaser from 'phaser';
import * as config from '../../game/config';


function GameTable() {

 const game = new Phaser.Game(config);
  

  useEffect(()=>{
    return(()=>game.destroy(true));
  });

  return (
    <div className="game" id='game'>
     
    </div>
  );
}

export default GameTable;