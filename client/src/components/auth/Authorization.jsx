import React, {useState} from 'react';

function Authorization() {
    return (
        <div className='authorization'>
            <div className="authorization__header">Login</div>
            <input type='email' placeholder='email' />
            <input type='password' placeholder='password' />            
            <button className="authorization__btn" onClick={()=>{}}>Login</button>
        </div>
    )
}

export default Authorization
