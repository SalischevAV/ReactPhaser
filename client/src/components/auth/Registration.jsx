import React, {useState} from 'react';


function Registration() {
   
    return (
        <div className='authorization'>
            <div className="authorization__header">Registration</div>
            <input type='email' placeholder='email' />
            <input type='text' placeholder='name' />
            <input type='password' placeholder='password' /> 
            <button className="authorization__btn" onClick={()=>{}}>Registration</button>
        </div>
    )
}

export default Registration
