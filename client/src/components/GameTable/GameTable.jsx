import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Phaser from 'phaser';
import SnakeScene from '../../snake/scenes/game';
import Menu from '../../snake/scenes/menu';
import GameOver from '../../snake/scenes/gameOver';
import GameWin from '../../snake/scenes/gameWin';
import { GAME_END } from '../../snake/types';
import {setScore, token} from '../../redux/actions/userActions';
import './style.css'

const config = {
  type: Phaser.CANVAS,
  width: 960,
  height: 720,
  backgroundColor: '#bfcc00',
  parent: 'game',
   scene: [ Menu, SnakeScene, GameOver, GameWin]
}


function GameTable() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  const game = new Phaser.Game(config);
  game.scene.start(Menu); 
  game.events.on(GAME_END, data =>{
    let scores = localStorage.getItem('highScore');
    if (scores < data.score) {
    dispatch(setScore(data));
    }
  }); 
  
  const tokenTimer = setInterval(() => dispatch(token(currentUser.email)),
  10000);

  useEffect(()=>{
    return(()=>{
      game.destroy(true);
      clearInterval(tokenTimer);
    });
  });

  return (
    <div className="game" id='game'>
     
    </div>
  );
}

export default GameTable;