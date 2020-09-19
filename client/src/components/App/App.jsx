import React from 'react';
import Game from '../Game/Game.jsx';
import Authorization from '../auth/Authorization.jsx';
import Registration from '../auth/Registration.jsx';
import '../../assets/scss/style.css';

function App() {
    return (
        <div className='app'>
            <Authorization />
            <Registration />
            <Game />
        </div>
    )
}

export default App
