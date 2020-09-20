import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { registraion } from '../../redux/actions/userActions';

function Registration() {
    const dispatch = useDispatch();
    const[user, setUser] = useState({
        email:'',
        name:'',
        password:''
    })

    const changeInputHandler = event => {
        event.persist();
        setUser(previousState => ({
            ...previousState, ...{
                [event.target.name]: event.target.value
            }
        }));
    }

    const clearState = ()=>{
        setUser({
            email:'',
            name:'',
            password:''
        })
    }

    const submitRegHandler =(event)=>{
        event.preventDefault();
        dispatch(registraion(user.email, user.name, user.password));
        clearState();
    }

  return (
    <div className="authorization">
      <div className="authorization__header">Registration</div>
      <form onSubmit={submitRegHandler}>
        <input type="email" placeholder="email" value={user.email} name='email' onChange={changeInputHandler} />
        <input type="text" placeholder="name" value={user.name} name='name' onChange={changeInputHandler} />
        <input type="password" placeholder="password" value={user.password} name='password' onChange={changeInputHandler} />
        <button className="authorization__btn" type="submit">
          Registration
        </button>
      </form>
    </div>
  );
}

export default Registration;
