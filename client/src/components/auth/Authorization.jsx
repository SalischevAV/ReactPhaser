import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/userActions";

function Authorization() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changeInputHandler = (event) => {
    event.persist();
    setUser((previousState) => ({
      ...previousState,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  const clearState = () => {
    setUser({
      email: "",
      password: "",
    });
  };

  const submitAuthHandler = (event) => {
    event.preventDefault();
    dispatch(login(user.email, user.password));
    clearState();
  };

  return (
    <div className="authorization">
      <div className="authorization__header">Login</div>
      <form onSubmit={submitAuthHandler}>
        <input
          type="email"
          placeholder="email"
          value={user.email}
          name="email"
          onChange={changeInputHandler}
        />
        <input
          type="password"
          placeholder="password"
          value={user.password}
          name="password"
          onChange={changeInputHandler}
        />
        <button className="authorization__btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Authorization;
